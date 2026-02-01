# InverPulse Trading Platform Models and Functions

from pydantic import BaseModel, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from enum import Enum

class InverPulseLevel(str, Enum):
    HIERRO = "hierro"
    COBRE = "cobre"
    BRONCE = "bronce"
    PLATA = "plata"
    ORO = "oro"
    PLATINO = "platino"
    DIAMANTE = "diamante"
    ZAFIRO = "zafiro"
    RUBI = "rubi"

class KYCStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class InversorInverPulse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    inversor_id: str
    user_id: str
    email: EmailStr
    name: str
    level: str = InverPulseLevel.HIERRO
    total_deposit: float = 0.0
    total_profit: float = 0.0
    kyc_status: str = KYCStatus.PENDING
    kyc_documents: Optional[Dict[str, str]] = None
    referral_code: str
    referred_by: Optional[str] = None
    direct_referrals: List[str] = []
    created_at: datetime
    updated_at: datetime

class InversorDeposit(BaseModel):
    model_config = ConfigDict(extra="ignore")
    deposit_id: str
    inversor_id: str
    amount: float
    currency: str = "USD"
    status: str
    transaction_hash: Optional[str] = None
    created_at: datetime

class TradingSignal(BaseModel):
    model_config = ConfigDict(extra="ignore")
    signal_id: str
    created_by: str
    signal_type: str  # "buy" or "sell"
    asset: str  # "BTC", "ETH", etc
    entry_price: float
    target_price: float
    stop_loss: float
    min_level_required: str
    status: str  # "active", "closed", "cancelled"
    result: Optional[str] = None  # "profit", "loss", "break-even"
    notes: Optional[str] = None
    created_at: datetime
    expires_at: datetime

class KYCRequest(BaseModel):
    inversor_id: str
    document_type: str
    document_number: str
    document_front_url: str
    document_back_url: Optional[str] = None
    selfie_url: str

class LevelRequirements:
    @staticmethod
    def get_requirements(level: str) -> Dict[str, Any]:
        requirements = {
            InverPulseLevel.HIERRO: {
                "min_deposit": 100,
                "signals_per_day": 2,
                "days_active": ["mon", "tue", "wed", "thu", "fri"],
                "referrals_required": 0
            },
            InverPulseLevel.COBRE: {
                "min_deposit": 200,
                "signals_per_day": 2,
                "days_active": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
                "referrals_required": 0
            },
            InverPulseLevel.BRONCE: {
                "min_deposit": 0,
                "signals_per_day": 3,
                "days_active": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
                "referrals_required": 5,
                "referrals_min_deposit": 100,
                "referrals_kyc": True
            },
            InverPulseLevel.PLATA: {
                "min_deposit": 0,
                "signals_per_day": 4,
                "days_active": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
                "referrals_5x5": True,
                "description": "Sistema 5x5 completado"
            },
            InverPulseLevel.ORO: {
                "min_deposit": 0,
                "signals_per_day": 5,
                "days_active": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
                "referrals_required_level": InverPulseLevel.PLATA,
                "referrals_count": 5
            },
            InverPulseLevel.PLATINO: {
                "min_deposit": 0,
                "signals_per_day": 6,
                "days_active": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
                "referrals_required_level": InverPulseLevel.ORO,
                "referrals_count": 5
            },
            InverPulseLevel.DIAMANTE: {
                "min_deposit": 0,
                "signals_per_day": 7,
                "days_active": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
                "referrals_required_level": InverPulseLevel.PLATINO,
                "referrals_count": 5
            },
            InverPulseLevel.ZAFIRO: {
                "min_deposit": 0,
                "signals_per_day": 8,
                "days_active": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
                "referrals_required_level": InverPulseLevel.DIAMANTE,
                "referrals_count": 5
            },
            InverPulseLevel.RUBI: {
                "min_deposit": 0,
                "signals_per_day": 10,
                "days_active": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
                "referrals_required_level": InverPulseLevel.ZAFIRO,
                "referrals_count": 5
            }
        }
        return requirements.get(level, {})

    @staticmethod
    async def check_level_eligibility(inversor_data: Dict, db) -> str:
        """Check what level an investor is eligible for"""
        total_deposit = inversor_data.get("total_deposit", 0)
        direct_referrals = inversor_data.get("direct_referrals", [])
        
        # Check Cobre
        if total_deposit >= 200:
            return InverPulseLevel.COBRE
        
        # Check Hierro
        if total_deposit >= 100:
            return InverPulseLevel.HIERRO
        
        # Check Bronce (5 referidos con KYC y $100 c/u)
        if len(direct_referrals) >= 5:
            valid_referrals = 0
            for ref_id in direct_referrals:
                referido = await db.inversores_inverpulse.find_one({"inversor_id": ref_id}, {"_id": 0})
                if referido and referido.get("kyc_status") == "approved" and referido.get("total_deposit", 0) >= 100:
                    valid_referrals += 1
            
            if valid_referrals >= 5:
                # Check for higher levels based on referrals' levels
                referrals_levels = []
                for ref_id in direct_referrals[:5]:
                    ref = await db.inversores_inverpulse.find_one({"inversor_id": ref_id}, {"_id": 0})
                    if ref:
                        referrals_levels.append(ref.get("level", InverPulseLevel.HIERRO))
                
                # Rubí - 5 referidos nivel Zafiro
                if referrals_levels.count(InverPulseLevel.ZAFIRO) >= 5:
                    return InverPulseLevel.RUBI
                
                # Zafiro - 5 referidos nivel Diamante
                if referrals_levels.count(InverPulseLevel.DIAMANTE) >= 5:
                    return InverPulseLevel.ZAFIRO
                
                # Diamante - 5 referidos nivel Platino
                if referrals_levels.count(InverPulseLevel.PLATINO) >= 5:
                    return InverPulseLevel.DIAMANTE
                
                # Platino - 5 referidos nivel Oro
                if referrals_levels.count(InverPulseLevel.ORO) >= 5:
                    return InverPulseLevel.PLATINO
                
                # Oro - 5 referidos nivel Plata
                if referrals_levels.count(InverPulseLevel.PLATA) >= 5:
                    return InverPulseLevel.ORO
                
                # Plata - Sistema 5x5 (por ahora simplificado)
                # TODO: Implementar verificación completa 5x5
                total_network = await count_network_recursive(inversor_data["inversor_id"], db, depth=5)
                if total_network >= 25:  # Simplificado: al menos 25 en la red
                    return InverPulseLevel.PLATA
                
                return InverPulseLevel.BRONCE
        
        return InverPulseLevel.HIERRO

async def count_network_recursive(inversor_id: str, db, depth: int, current_depth: int = 0) -> int:
    """Count total network size recursively"""
    if current_depth >= depth:
        return 0
    
    inversor = await db.inversores_inverpulse.find_one({"inversor_id": inversor_id}, {"_id": 0})
    if not inversor:
        return 0
    
    direct_referrals = inversor.get("direct_referrals", [])
    count = len(direct_referrals)
    
    for ref_id in direct_referrals:
        count += await count_network_recursive(ref_id, db, depth, current_depth + 1)
    
    return count
