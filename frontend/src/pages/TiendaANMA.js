import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Package, ShoppingCart, MessageSquare, X } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const BACKEND_URL = import.meta.env.VITE_API_URL;
const API = `${BACKEND_URL}/api`;

function TiendaANMA() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatSessionId, setChatSessionId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get(`${API}/products?status=active`);
      setProducts(response.data);
    } catch (error) {
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.product_id === product.product_id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.product_id === product.product_id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success('Producto agregado al carrito');
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product_id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.product_id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    try {
      const response = await axios.get(`${API}/auth/me`, { withCredentials: true });
      const orderProducts = cart.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));

      const orderResponse = await axios.post(
        `${API}/orders`,
        { products: orderProducts },
        { withCredentials: true }
      );

      const paymentResponse = await axios.post(
        `${API}/payments/stripe/checkout`,
        {
          order_id: orderResponse.data.order_id,
          origin_url: window.location.origin
        },
        { withCredentials: true }
      );

      window.location.href = paymentResponse.data.url;
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Por favor inicia sesión para continuar');
        setTimeout(() => window.location.href = '/login', 1500);
      } else {
        toast.error('Error al procesar el pago');
      }
    }
  };

  const sendChatMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMsg = { role: 'user', content: chatMessage };
    setChatHistory([...chatHistory, userMsg]);
    setChatMessage('');

    try {
      const response = await axios.post(`${API}/chat`, {
        message: chatMessage,
        session_id: chatSessionId
      });

      setChatSessionId(response.data.session_id);
      const botMsg = { role: 'assistant', content: response.data.response };
      setChatHistory([...chatHistory, userMsg, botMsg]);
    } catch (error) {
      toast.error('Error al enviar mensaje');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/anma" className="flex items-center gap-2">
            <Package className="h-8 w-8 text-[#0F766E]" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold text-[#0F172A]">ANMA Tienda</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              data-testid="cart-btn"
              onClick={() => setShowCart(true)}
              variant="outline"
              className="relative rounded-lg"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0F766E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Button>
            <Link to="/login">
              <Button data-testid="tienda-login-btn" className="bg-[#0F766E] hover:bg-[#0D5F58] text-white rounded-lg">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Catálogo de Productos</h2>
          <p className="text-lg text-slate-600">Explora nuestros productos de hogar, bienestar y tecnología</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F766E] mx-auto"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">No hay productos disponibles en este momento</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.product_id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all card-hover">
                <div className="h-64 bg-slate-100 overflow-hidden">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="text-xs text-[#0F766E] font-semibold mb-2 uppercase">{product.category}</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">{product.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#0F172A]">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-slate-500">Comisión: {product.commission_rate}%</span>
                  </div>
                  <Button
                    data-testid={`add-to-cart-${product.product_id}`}
                    onClick={() => addToCart(product)}
                    className="w-full bg-[#0F766E] hover:bg-[#0D5F58] text-white rounded-lg"
                  >
                    Agregar al Carrito
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* CART DIALOG */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#0F172A]">Carrito de Compras</DialogTitle>
          </DialogHeader>
          {cart.length === 0 ? (
            <div className="text-center py-8 text-slate-600">Tu carrito está vacío</div>
          ) : (
            <div>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.product_id} className="flex gap-4 items-center border-b border-slate-200 pb-4">
                    <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold text-[#0F172A]">{item.name}</h4>
                      <p className="text-slate-600 text-sm">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>-</Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>+</Button>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.product_id)}>
                      <X className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-[#0F172A]">Total:</span>
                  <span className="text-2xl font-bold text-[#0F766E]">${cartTotal.toFixed(2)}</span>
                </div>
                <Button
                  data-testid="checkout-btn"
                  onClick={handleCheckout}
                  className="w-full bg-[#0F766E] hover:bg-[#0D5F58] text-white rounded-lg h-12 text-lg font-semibold"
                >
                  Proceder al Pago
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* LUCIDBOT CHAT */}
      <button
        data-testid="lucidbot-toggle"
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-[#0F766E] text-white p-4 rounded-full shadow-lg hover:bg-[#0D5F58] transition-all z-[100]"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {chatOpen && (
        <div data-testid="lucidbot-chat-container" className="fixed bottom-24 right-6 w-96 h-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-[100] flex flex-col">
          <div className="bg-[#0F766E] text-white p-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
            <h3 className="font-bold">LucidBot - Asistente ANMA</h3>
            <button onClick={() => setChatOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.length === 0 && (
              <div className="text-slate-500 text-sm text-center py-8">
                ¡Hola! Soy LucidBot. ¿En qué puedo ayudarte?
              </div>
            )}
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-[#0F766E] text-white' : 'bg-slate-100 text-slate-900'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-200 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                data-testid="chat-input"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1"
              />
              <Button data-testid="chat-send-btn" onClick={sendChatMessage} className="bg-[#0F766E] hover:bg-[#0D5F58] text-white">
                Enviar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TiendaANMA;
