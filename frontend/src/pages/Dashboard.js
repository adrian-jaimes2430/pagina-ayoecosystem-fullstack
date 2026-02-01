import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Package, DollarSign, ShoppingBag, LogOut, User, Users, TrendingDown, Zap } from 'lucide-react';
import { toast } from 'sonner';
import NotificationBell from '@/components/NotificationBell';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [commissions, setCommissions] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [userRes, statsRes, ordersRes] = await Promise.all([
        axios.get(`${API}/auth/me`, { withCredentials: true }),
        axios.get(`${API}/stats/dashboard`, { withCredentials: true }),
        axios.get(`${API}/orders`, { withCredentials: true })
      ]);

      setUser(userRes.data);
      setStats(statsRes.data);
      setOrders(ordersRes.data);

      if (userRes.data.role === 'impulsador') {
        const commissionsRes = await axios.get(`${API}/commissions`, { withCredentials: true });
        setCommissions(commissionsRes.data);
      }
    } catch (error) {
      toast.error('Error al cargar dashboard');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      toast.success('Sesión cerrada');
      navigate('/login');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  if (!user || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F766E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-[#0F172A]">Dashboard</h2>
          </div>
          <nav className="p-4 space-y-2">
            <a href="#resumen" className="flex items-center gap-3 px-4 py-3 text-slate-700 bg-slate-100 rounded-lg font-medium">
              <Package className="h-5 w-5" />
              Resumen
            </a>
            {user.role === 'impulsador' && (
              <a href="#comisiones" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg">
                <DollarSign className="h-5 w-5" />
                Comisiones
              </a>
            )}
            <a href="#pedidos" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg">
              <ShoppingBag className="h-5 w-5" />
              Pedidos
            </a>
            {['super_admin', 'admin_marca'].includes(user.role) && (
              <button
                onClick={() => navigate('/admin')}
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <User className="h-5 w-5" />
                Admin Panel
              </button>
            )}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">Bienvenido, {user.name}</h1>
              <p className="text-sm text-slate-600">Rol: {user.role}</p>
            </div>
            <Button data-testid="logout-btn" onClick={handleLogout} variant="outline" className="rounded-lg">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </header>

          <div className="p-8">
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {user.role === 'impulsador' ? (
                <>
                  <div className="bg-white border border-slate-200 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Total Pedidos</span>
                      <ShoppingBag className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="text-3xl font-bold text-[#0F172A]" style={{fontFamily: 'Space Grotesk, monospace'}}>
                      {stats.total_orders || 0}
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Pedidos Pagados</span>
                      <Package className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="text-3xl font-bold text-[#0F766E]" style={{fontFamily: 'Space Grotesk, monospace'}}>
                      {stats.paid_orders || 0}
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Comisiones Totales</span>
                      <DollarSign className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="text-3xl font-bold text-[#F59E0B]" style={{fontFamily: 'Space Grotesk, monospace'}}>
                      ${stats.total_commission?.toFixed(2) || '0.00'}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white border border-slate-200 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600">Mis Pedidos</span>
                    <ShoppingBag className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="text-3xl font-bold text-[#0F172A]" style={{fontFamily: 'Space Grotesk, monospace'}}>
                    {stats.total_orders || 0}
                  </div>
                </div>
              )}
            </div>

            {/* ORDERS LIST */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">Últimos Pedidos</h2>
              {orders.length === 0 ? (
                <p className="text-slate-600 text-center py-8">No tienes pedidos todavía</p>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.order_id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[#0F172A]">Pedido #{order.order_id.slice(-8)}</div>
                          <div className="text-sm text-slate-600">{order.products.length} producto(s)</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#0F172A]">${order.total_amount.toFixed(2)}</div>
                          <div className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {order.payment_status === 'paid' ? 'Pagado' : 'Pendiente'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;