from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response, Cookie
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import asyncio
import resend
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ.get('JWT_SECRET', 'default_secret_key')
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY')
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

resend.api_key = RESEND_API_KEY

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# MODELS
class UserRole:
    SUPER_ADMIN = "super_admin"
    ADMIN_MARCA = "admin_marca"
    GERENTE = "gerente"
    IMPULSADOR = "impulsador"
    MIEMBRO = "miembro"

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    email: EmailStr
    name: str
    role: str = UserRole.MIEMBRO
    picture: Optional[str] = None
    created_at: datetime

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    product_id: str
    name: str
    description: str
    price: float
    commission_rate: float
    category: str
    image_url: str
    status: str = "active"
    stock: int = 999
    created_at: datetime

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    commission_rate: float
    category: str
    image_url: str
    stock: Optional[int] = 999

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    order_id: str
    user_id: str
    impulsador_id: Optional[str] = None
    products: List[Dict[str, Any]]
    total_amount: float
    commission_amount: float
    status: str
    payment_status: str
    created_at: datetime

class OrderCreate(BaseModel):
    products: List[Dict[str, Any]]
    impulsador_id: Optional[str] = None

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class EmailRequest(BaseModel):
    recipient_email: EmailStr
    subject: str
    html_content: str

class InverfactContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    interested_strategy: Optional[str] = None

class InverfactStrategy(BaseModel):
    strategy_id: str
    name: str
    description: str
    min_deposit: float
    category: str
    is_active: bool = True

# AUTH HELPER
async def get_current_user(request: Request, session_token: Optional[str] = Cookie(None)) -> User:
    token = session_token
    if not token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
    
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if isinstance(user['created_at'], str):
        user['created_at'] = datetime.fromisoformat(user['created_at'])
    
    return User(**user)

# AUTH ENDPOINTS
@api_router.post("/auth/register")
async def register(user_data: UserRegister):
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt())
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    
    user_doc = {
        "user_id": user_id,
        "email": user_data.email,
        "name": user_data.name,
        "password": hashed_password.decode('utf-8'),
        "role": UserRole.MIEMBRO,
        "picture": None,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.users.insert_one(user_doc)
    
    session_token = f"session_{uuid.uuid4().hex}"
    session_doc = {
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.user_sessions.insert_one(session_doc)
    
    return {"user_id": user_id, "email": user_data.email, "name": user_data.name, "session_token": session_token}

@api_router.post("/auth/login")
async def login(credentials: UserLogin, response: Response):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not bcrypt.checkpw(credentials.password.encode('utf-8'), user["password"].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    session_token = f"session_{uuid.uuid4().hex}"
    session_doc = {
        "user_id": user["user_id"],
        "session_token": session_token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.user_sessions.insert_one(session_doc)
    
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=7*24*60*60,
        path="/"
    )
    
    return {"user_id": user["user_id"], "email": user["email"], "name": user["name"], "role": user["role"], "session_token": session_token}

@api_router.get("/auth/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@api_router.post("/auth/logout")
async def logout(response: Response, session_token: Optional[str] = Cookie(None)):
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    
    response.delete_cookie(key="session_token", path="/")
    return {"message": "Logged out successfully"}

@api_router.post("/auth/session")
async def process_session(request: Request, response: Response):
    data = await request.json()
    session_id = request.headers.get("X-Session-ID")
    
    if not session_id:
        raise HTTPException(status_code=400, detail="Session ID required")
    
    try:
        import aiohttp
        async with aiohttp.ClientSession() as session:
            async with session.get(
                "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
                headers={"X-Session-ID": session_id}
            ) as resp:
                if resp.status != 200:
                    raise HTTPException(status_code=401, detail="Invalid session")
                oauth_data = await resp.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OAuth error: {str(e)}")
    
    user = await db.users.find_one({"email": oauth_data["email"]}, {"_id": 0})
    
    if not user:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        user_doc = {
            "user_id": user_id,
            "email": oauth_data["email"],
            "name": oauth_data["name"],
            "picture": oauth_data.get("picture"),
            "role": UserRole.MIEMBRO,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(user_doc)
        user = user_doc
    
    session_token = oauth_data["session_token"]
    session_doc = {
        "user_id": user["user_id"],
        "session_token": session_token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.user_sessions.insert_one(session_doc)
    
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=7*24*60*60,
        path="/"
    )
    
    return {"user_id": user["user_id"], "email": user["email"], "name": user["name"], "role": user["role"], "picture": user.get("picture")}

# PRODUCTS
@api_router.post("/products", response_model=Product)
async def create_product(product_data: ProductCreate, current_user: User = Depends(get_current_user)):
    if current_user.role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN_MARCA]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    product_id = f"prod_{uuid.uuid4().hex[:12]}"
    product_doc = {
        **product_data.model_dump(),
        "product_id": product_id,
        "status": "active",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.products.insert_one(product_doc)
    product_doc['created_at'] = datetime.fromisoformat(product_doc['created_at'])
    return Product(**product_doc)

@api_router.get("/products", response_model=List[Product])
async def get_products(status: Optional[str] = None):
    query = {}
    if status:
        query["status"] = status
    
    products = await db.products.find(query, {"_id": 0}).to_list(1000)
    for product in products:
        if isinstance(product['created_at'], str):
            product['created_at'] = datetime.fromisoformat(product['created_at'])
    
    return [Product(**p) for p in products]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"product_id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if isinstance(product['created_at'], str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    
    return Product(**product)

@api_router.put("/products/{product_id}")
async def update_product(product_id: str, product_data: ProductCreate, current_user: User = Depends(get_current_user)):
    if current_user.role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN_MARCA]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    result = await db.products.update_one(
        {"product_id": product_id},
        {"$set": product_data.model_dump()}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product updated successfully"}

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, current_user: User = Depends(get_current_user)):
    if current_user.role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN_MARCA]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    result = await db.products.update_one(
        {"product_id": product_id},
        {"$set": {"status": "inactive"}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product deactivated successfully"}

# ORDERS
@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate, current_user: User = Depends(get_current_user)):
    total_amount = 0.0
    commission_amount = 0.0
    
    for item in order_data.products:
        product = await db.products.find_one({"product_id": item["product_id"]}, {"_id": 0})
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item['product_id']} not found")
        
        item_total = product["price"] * item["quantity"]
        total_amount += item_total
        commission_amount += item_total * (product["commission_rate"] / 100)
    
    order_id = f"order_{uuid.uuid4().hex[:12]}"
    order_doc = {
        "order_id": order_id,
        "user_id": current_user.user_id,
        "impulsador_id": order_data.impulsador_id,
        "products": order_data.products,
        "total_amount": total_amount,
        "commission_amount": commission_amount,
        "status": "pending",
        "payment_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.orders.insert_one(order_doc)
    order_doc['created_at'] = datetime.fromisoformat(order_doc['created_at'])
    return Order(**order_doc)

@api_router.get("/orders", response_model=List[Order])
async def get_orders(current_user: User = Depends(get_current_user)):
    query = {}
    if current_user.role == UserRole.IMPULSADOR:
        query["impulsador_id"] = current_user.user_id
    elif current_user.role == UserRole.MIEMBRO:
        query["user_id"] = current_user.user_id
    
    orders = await db.orders.find(query, {"_id": 0}).to_list(1000)
    for order in orders:
        if isinstance(order['created_at'], str):
            order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return [Order(**o) for o in orders]

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, current_user: User = Depends(get_current_user)):
    order = await db.orders.find_one({"order_id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if current_user.role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN_MARCA] and order["user_id"] != current_user.user_id and order.get("impulsador_id") != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if isinstance(order['created_at'], str):
        order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return Order(**order)

# STRIPE PAYMENT
@api_router.post("/payments/stripe/checkout")
async def create_stripe_checkout(request: Request, current_user: User = Depends(get_current_user)):
    data = await request.json()
    order_id = data.get("order_id")
    origin_url = data.get("origin_url")
    
    if not order_id or not origin_url:
        raise HTTPException(status_code=400, detail="order_id and origin_url required")
    
    order = await db.orders.find_one({"order_id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    success_url = f"{origin_url}/payment-success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin_url}/anma/tienda"
    
    webhook_url = f"{origin_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    checkout_request = CheckoutSessionRequest(
        amount=order["total_amount"],
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={"order_id": order_id, "user_id": current_user.user_id}
    )
    
    session = await stripe_checkout.create_checkout_session(checkout_request)
    
    payment_doc = {
        "payment_id": f"pay_{uuid.uuid4().hex[:12]}",
        "order_id": order_id,
        "user_id": current_user.user_id,
        "session_id": session.session_id,
        "amount": order["total_amount"],
        "currency": "usd",
        "payment_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.payment_transactions.insert_one(payment_doc)
    
    return {"url": session.url, "session_id": session.session_id}

@api_router.get("/payments/stripe/status/{session_id}")
async def get_stripe_status(session_id: str, current_user: User = Depends(get_current_user)):
    payment = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    if payment["payment_status"] == "paid":
        return {"status": "complete", "payment_status": "paid"}
    
    webhook_url = "https://placeholder.com/webhook"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    status = await stripe_checkout.get_checkout_status(session_id)
    
    if status.payment_status == "paid" and payment["payment_status"] != "paid":
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {"payment_status": "paid", "status": status.status}}
        )
        await db.orders.update_one(
            {"order_id": payment["order_id"]},
            {"$set": {"payment_status": "paid", "status": "confirmed"}}
        )
    
    return {"status": status.status, "payment_status": status.payment_status, "amount_total": status.amount_total}

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    
    webhook_url = "https://placeholder.com/webhook"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    try:
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        if webhook_response.payment_status == "paid":
            payment = await db.payment_transactions.find_one({"session_id": webhook_response.session_id}, {"_id": 0})
            if payment and payment["payment_status"] != "paid":
                await db.payment_transactions.update_one(
                    {"session_id": webhook_response.session_id},
                    {"$set": {"payment_status": "paid"}}
                )
                await db.orders.update_one(
                    {"order_id": payment["order_id"]},
                    {"$set": {"payment_status": "paid", "status": "confirmed"}}
                )
        
        return {"status": "success"}
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# LUCIDBOT CHAT
@api_router.post("/chat")
async def chat_with_lucibot(message: ChatMessage):
    try:
        session_id = message.session_id or f"session_{uuid.uuid4().hex[:8]}"
        
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message="Eres LucidBot, asistente de ANMA Soluciones - el centro de e-commerce y dropshipping del Ecosistema A&O. Ayudas a los clientes con información sobre productos (salud, belleza, temporada, virales), pedidos, envíos y pagos. Eres amable, profesional y enfocado en resolver dudas de compra. IMPORTANTE: ANMA NO tiene modelo de impulsadores ni comisiones, eso es de NomadHive (otra sub-marca). ANMA es solo tienda online."
        ).with_model("openai", "gpt-5.2")
        
        user_message = UserMessage(text=message.message)
        response = await chat.send_message(user_message)
        
        return {"response": response, "session_id": session_id}
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

# EMAIL
@api_router.post("/emails/send")
async def send_email(email_request: EmailRequest):
    params = {
        "from": SENDER_EMAIL,
        "to": [email_request.recipient_email],
        "subject": email_request.subject,
        "html": email_request.html_content
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        return {"status": "success", "message": f"Email sent to {email_request.recipient_email}", "email_id": email.get("id")}
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

# USERS MANAGEMENT
@api_router.get("/users", response_model=List[User])
async def get_users(current_user: User = Depends(get_current_user)):
    if current_user.role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN_MARCA]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    users = await db.users.find({}, {"_id": 0, "password": 0}).to_list(1000)
    for user in users:
        if isinstance(user['created_at'], str):
            user['created_at'] = datetime.fromisoformat(user['created_at'])
    
    return [User(**u) for u in users]

@api_router.put("/users/{user_id}/role")
async def update_user_role(user_id: str, role_data: dict, current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    new_role = role_data.get("role")
    if new_role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN_MARCA, UserRole.GERENTE, UserRole.IMPULSADOR, UserRole.MIEMBRO]:
        raise HTTPException(status_code=400, detail="Invalid role")
    
    result = await db.users.update_one(
        {"user_id": user_id},
        {"$set": {"role": new_role}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "Role updated successfully"}

# COMMISSIONS
@api_router.get("/commissions")
async def get_commissions(current_user: User = Depends(get_current_user)):
    if current_user.role == UserRole.IMPULSADOR:
        orders = await db.orders.find({"impulsador_id": current_user.user_id, "payment_status": "paid"}, {"_id": 0}).to_list(1000)
    elif current_user.role in [UserRole.SUPER_ADMIN, UserRole.ADMIN_MARCA]:
        orders = await db.orders.find({"payment_status": "paid"}, {"_id": 0}).to_list(1000)
    else:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    total_commission = sum(order["commission_amount"] for order in orders)
    
    return {
        "total_commission": total_commission,
        "orders_count": len(orders),
        "orders": orders
    }

# STATS
@api_router.get("/stats/dashboard")
async def get_dashboard_stats(current_user: User = Depends(get_current_user)):
    if current_user.role in [UserRole.SUPER_ADMIN, UserRole.ADMIN_MARCA]:
        total_products = await db.products.count_documents({"status": "active"})
        total_orders = await db.orders.count_documents({})
        total_users = await db.users.count_documents({})
        total_revenue = 0
        
        paid_orders = await db.orders.find({"payment_status": "paid"}, {"_id": 0}).to_list(1000)
        total_revenue = sum(order["total_amount"] for order in paid_orders)
        
        return {
            "total_products": total_products,
            "total_orders": total_orders,
            "total_users": total_users,
            "total_revenue": total_revenue
        }
    elif current_user.role == UserRole.IMPULSADOR:
        my_orders = await db.orders.find({"impulsador_id": current_user.user_id}, {"_id": 0}).to_list(1000)
        paid_orders = [o for o in my_orders if o["payment_status"] == "paid"]
        total_commission = sum(order["commission_amount"] for order in paid_orders)
        
        return {
            "total_orders": len(my_orders),
            "paid_orders": len(paid_orders),
            "total_commission": total_commission
        }
    else:
        my_orders = await db.orders.find({"user_id": current_user.user_id}, {"_id": 0}).to_list(1000)
        return {
            "total_orders": len(my_orders)
        }

# ==================== INVERPULSE ENDPOINTS ====================
from inverpulse_models import (
    InverPulseLevel, KYCStatus, InversorInverPulse, InversorDeposit, 
    TradingSignal, KYCRequest, LevelRequirements
)

# INVERPULSE - Registro de inversor
@api_router.post("/inverpulse/register")
async def register_inverpulse_investor(request: Request, current_user: User = Depends(get_current_user)):
    data = await request.json()
    referred_by_code = data.get("referral_code")
    
    # Verificar si ya está registrado
    existing = await db.inversores_inverpulse.find_one({"user_id": current_user.user_id})
    if existing:
        raise HTTPException(status_code=400, detail="Ya estás registrado en InverPulse")
    
    # Generar código de referido único
    referral_code = f"IP{uuid.uuid4().hex[:8].upper()}"
    
    inversor_id = f"inv_{uuid.uuid4().hex[:12]}"
    inversor_doc = {
        "inversor_id": inversor_id,
        "user_id": current_user.user_id,
        "email": current_user.email,
        "name": current_user.name,
        "level": InverPulseLevel.HIERRO,
        "total_deposit": 0.0,
        "total_profit": 0.0,
        "kyc_status": KYCStatus.PENDING,
        "kyc_documents": None,
        "referral_code": referral_code,
        "referred_by": None,
        "direct_referrals": [],
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    
    # Si hay código de referido, agregar a la red
    if referred_by_code:
        referrer = await db.inversores_inverpulse.find_one({"referral_code": referred_by_code}, {"_id": 0})
        if referrer:
            inversor_doc["referred_by"] = referrer["inversor_id"]
            # Agregar a la lista de referidos directos del referidor
            await db.inversores_inverpulse.update_one(
                {"inversor_id": referrer["inversor_id"]},
                {"$push": {"direct_referrals": inversor_id}}
            )
    
    await db.inversores_inverpulse.insert_one(inversor_doc)
    
    return {"message": "Registrado exitosamente en InverPulse", "inversor_id": inversor_id, "referral_code": referral_code}

# INVERPULSE - Obtener perfil del inversor
@api_router.get("/inverpulse/profile")
async def get_inverpulse_profile(current_user: User = Depends(get_current_user)):
    inversor = await db.inversores_inverpulse.find_one({"user_id": current_user.user_id}, {"_id": 0})
    if not inversor:
        raise HTTPException(status_code=404, detail="No estás registrado en InverPulse")
    
    # Obtener requirements del nivel actual
    requirements = LevelRequirements.get_requirements(inversor["level"])
    
    # Contar referidos activos
    direct_referrals_data = []
    for ref_id in inversor.get("direct_referrals", []):
        ref = await db.inversores_inverpulse.find_one({"inversor_id": ref_id}, {"_id": 0, "name": 1, "level": 1, "total_deposit": 1, "kyc_status": 1})
        if ref:
            direct_referrals_data.append(ref)
    
    inversor["direct_referrals_data"] = direct_referrals_data
    inversor["level_requirements"] = requirements
    
    return inversor

# INVERPULSE - Crear depósito
@api_router.post("/inverpulse/deposits")
async def create_inverpulse_deposit(request: Request, current_user: User = Depends(get_current_user)):
    data = await request.json()
    amount = data.get("amount")
    
    if not amount or amount < 100:
        raise HTTPException(status_code=400, detail="Depósito mínimo es $100")
    
    inversor = await db.inversores_inverpulse.find_one({"user_id": current_user.user_id}, {"_id": 0})
    if not inversor:
        raise HTTPException(status_code=404, detail="No estás registrado en InverPulse")
    
    deposit_id = f"dep_{uuid.uuid4().hex[:12]}"
    deposit_doc = {
        "deposit_id": deposit_id,
        "inversor_id": inversor["inversor_id"],
        "amount": amount,
        "currency": "USD",
        "status": "pending",
        "transaction_hash": None,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.inverpulse_deposits.insert_one(deposit_doc)
    
    return {"message": "Depósito registrado. Pendiente de confirmación.", "deposit_id": deposit_id}

# INVERPULSE - Confirmar depósito (ADMIN)
@api_router.post("/inverpulse/deposits/{deposit_id}/confirm")
async def confirm_inverpulse_deposit(deposit_id: str, request: Request, current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    data = await request.json()
    transaction_hash = data.get("transaction_hash")
    
    deposit = await db.inverpulse_deposits.find_one({"deposit_id": deposit_id}, {"_id": 0})
    if not deposit:
        raise HTTPException(status_code=404, detail="Depósito no encontrado")
    
    # Actualizar depósito
    await db.inverpulse_deposits.update_one(
        {"deposit_id": deposit_id},
        {"$set": {"status": "confirmed", "transaction_hash": transaction_hash}}
    )
    
    # Actualizar total_deposit del inversor
    await db.inversores_inverpulse.update_one(
        {"inversor_id": deposit["inversor_id"]},
        {
            "$inc": {"total_deposit": deposit["amount"]},
            "$set": {"updated_at": datetime.now(timezone.utc).isoformat()}
        }
    )
    
    # Verificar y actualizar nivel si corresponde
    inversor = await db.inversores_inverpulse.find_one({"inversor_id": deposit["inversor_id"]}, {"_id": 0})
    from inverpulse_models import LevelRequirements
    new_level = await LevelRequirements.check_level_eligibility(inversor, db)
    
    if new_level != inversor["level"]:
        await db.inversores_inverpulse.update_one(
            {"inversor_id": deposit["inversor_id"]},
            {"$set": {"level": new_level}}
        )
    
    return {"message": "Depósito confirmado y nivel actualizado"}

# INVERPULSE - Submit KYC
@api_router.post("/inverpulse/kyc/submit")
async def submit_inverpulse_kyc(kyc_data: KYCRequest, current_user: User = Depends(get_current_user)):
    inversor = await db.inversores_inverpulse.find_one({"user_id": current_user.user_id}, {"_id": 0})
    if not inversor:
        raise HTTPException(status_code=404, detail="No estás registrado en InverPulse")
    
    kyc_doc = {
        "document_type": kyc_data.document_type,
        "document_number": kyc_data.document_number,
        "document_front_url": kyc_data.document_front_url,
        "document_back_url": kyc_data.document_back_url,
        "selfie_url": kyc_data.selfie_url,
        "submitted_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.inversores_inverpulse.update_one(
        {"inversor_id": inversor["inversor_id"]},
        {"$set": {"kyc_documents": kyc_doc, "kyc_status": KYCStatus.PENDING}}
    )
    
    return {"message": "KYC enviado. Pendiente de revisión."}

# INVERPULSE - Aprobar/Rechazar KYC (ADMIN)
@api_router.post("/inverpulse/kyc/{inversor_id}/review")
async def review_inverpulse_kyc(inversor_id: str, request: Request, current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    data = await request.json()
    status = data.get("status")  # "approved" or "rejected"
    
    if status not in ["approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Status inválido")
    
    await db.inversores_inverpulse.update_one(
        {"inversor_id": inversor_id},
        {"$set": {"kyc_status": status}}
    )
    
    return {"message": f"KYC {status}"}

# INVERPULSE - Crear señal de trading (ADMIN)
@api_router.post("/inverpulse/signals")
async def create_trading_signal(request: Request, current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    data = await request.json()
    
    signal_id = f"sig_{uuid.uuid4().hex[:12]}"
    expires_hours = data.get("expires_hours", 24)
    
    signal_doc = {
        "signal_id": signal_id,
        "created_by": current_user.user_id,
        "signal_type": data["signal_type"],
        "asset": data["asset"],
        "entry_price": data["entry_price"],
        "target_price": data["target_price"],
        "stop_loss": data["stop_loss"],
        "min_level_required": data.get("min_level_required", InverPulseLevel.HIERRO),
        "status": "active",
        "result": None,
        "notes": data.get("notes"),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "expires_at": (datetime.now(timezone.utc) + timedelta(hours=expires_hours)).isoformat()
    }
    
    await db.inverpulse_signals.insert_one(signal_doc)
    
    return {"message": "Señal creada exitosamente", "signal_id": signal_id}

# INVERPULSE - Obtener señales según nivel del inversor
@api_router.get("/inverpulse/signals")
async def get_trading_signals(current_user: User = Depends(get_current_user)):
    inversor = await db.inversores_inverpulse.find_one({"user_id": current_user.user_id}, {"_id": 0})
    if not inversor:
        raise HTTPException(status_code=404, detail="No estás registrado en InverPulse")
    
    # Obtener señales activas según nivel
    level_hierarchy = [
        InverPulseLevel.HIERRO, InverPulseLevel.COBRE, InverPulseLevel.BRONCE,
        InverPulseLevel.PLATA, InverPulseLevel.ORO, InverPulseLevel.PLATINO,
        InverPulseLevel.DIAMANTE, InverPulseLevel.ZAFIRO, InverPulseLevel.RUBI
    ]
    
    inversor_level_index = level_hierarchy.index(inversor["level"])
    accessible_levels = level_hierarchy[:inversor_level_index + 1]
    
    signals = await db.inverpulse_signals.find(
        {
            "status": "active",
            "min_level_required": {"$in": accessible_levels}
        },
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    
    return {"signals": signals, "count": len(signals)}

# INVERPULSE - Actualizar nivel manualmente (ADMIN)
@api_router.post("/inverpulse/investors/{inversor_id}/update-level")
async def update_investor_level(inversor_id: str, request: Request, current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    data = await request.json()
    new_level = data.get("level")
    
    if new_level not in [l.value for l in InverPulseLevel]:
        raise HTTPException(status_code=400, detail="Nivel inválido")
    
    await db.inversores_inverpulse.update_one(
        {"inversor_id": inversor_id},
        {"$set": {"level": new_level, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    return {"message": f"Nivel actualizado a {new_level}"}

# INVERPULSE - Listar todos los inversores (ADMIN)
@api_router.get("/inverpulse/investors")
async def list_inverpulse_investors(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    investors = await db.inversores_inverpulse.find({}, {"_id": 0}).to_list(1000)
    
    return {"investors": investors, "count": len(investors)}

# INVERPULSE - Ver depósitos pendientes (ADMIN)
@api_router.get("/inverpulse/deposits/pending")
async def list_pending_deposits(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    deposits = await db.inverpulse_deposits.find({"status": "pending"}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    # Enriquecer con información del inversor
    for deposit in deposits:
        inversor = await db.inversores_inverpulse.find_one({"inversor_id": deposit["inversor_id"]}, {"_id": 0, "name": 1, "email": 1, "level": 1})
        if inversor:
            deposit["inversor_info"] = inversor
    
    return {"deposits": deposits, "count": len(deposits)}

# INVERPULSE - Ver KYC pendientes (ADMIN)
@api_router.get("/inverpulse/kyc/pending")
async def list_pending_kyc(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    pending_kyc = await db.inversores_inverpulse.find({"kyc_status": "pending"}, {"_id": 0}).to_list(1000)
    
    return {"pending_kyc": pending_kyc, "count": len(pending_kyc)}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    admin_user = await db.users.find_one({"email": "jaimesblandon.adrianfelipe@gmail.com"})
    if not admin_user:
        hashed_password = bcrypt.hashpw("Fagipitu2430*".encode('utf-8'), bcrypt.gensalt())
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        admin_doc = {
            "user_id": user_id,
            "email": "jaimesblandon.adrianfelipe@gmail.com",
            "name": "Gerencia General A&O",
            "password": hashed_password.decode('utf-8'),
            "role": UserRole.SUPER_ADMIN,
            "picture": None,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(admin_doc)
        logger.info("Super admin user created")
    else:
        user_id = admin_user["user_id"]
    
    # Registrar admin en InverPulse si no está registrado
    admin_inversor = await db.inversores_inverpulse.find_one({"user_id": user_id})
    if not admin_inversor:
        admin_inv_doc = {
            "inversor_id": f"inv_admin_{uuid.uuid4().hex[:8]}",
            "user_id": user_id,
            "email": "jaimesblandon.adrianfelipe@gmail.com",
            "name": "Gerencia General A&O",
            "level": InverPulseLevel.RUBI,  # Nivel máximo para admin
            "total_deposit": 0.0,
            "total_profit": 0.0,
            "kyc_status": "approved",
            "kyc_documents": None,
            "referral_code": "ADMIN2025",
            "referred_by": None,
            "direct_referrals": [],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.inversores_inverpulse.insert_one(admin_inv_doc)
        logger.info("Super admin registered in InverPulse with RUBI level")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()