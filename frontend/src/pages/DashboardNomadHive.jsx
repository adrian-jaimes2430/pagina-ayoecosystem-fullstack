import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { 
  Users, ArrowLeft, Trophy, Star, Gift, ShoppingBag, Target, 
  DollarSign, CheckCircle, Clock, TrendingUp, Copy, ExternalLink
} from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_API_URL;
const API = `${BACKEND_URL}/api`;

function DashboardNomadHive() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [orders, setOrders] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userRes, profileRes, tasksRes, rewardsRes, ordersRes, leaderboardRes] = await Promise.all([
        axios.get(`${API}/auth/me`, { withCredentials: true }),
        axios.get(`${API}/nomadhive/profile`, { withCredentials: true }),
        axios.get(`${API}/nomadhive/tasks`, { withCredentials: true }),
        axios.get(`${API}/nomadhive/rewards`, { withCredentials: true }),
        axios.get(`${API}/nomadhive/orders`, { withCredentials: true }),
        axios.get(`${API}/nomadhive/leaderboard`, { withCredentials: true })
      ]);

      setUser(userRes.data);
      setProfile(profileRes.data);
      setTasks(tasksRes.data.tasks);
      setRewards(rewardsRes.data.rewards);
      setOrders(ordersRes.data.orders);
      setLeaderboard(leaderboardRes.data.leaderboard);
    } catch (error) {
      toast.error('Error al cargar datos');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await axios.post(`${API}/nomadhive/tasks/${taskId}/complete`, {}, { withCredentials: true });
      toast.success(response.data.message);
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Error al completar tarea');
    }
  };

  const handleRedeemReward = async (rewardId) => {
    try {
      const response = await axios.post(`${API}/nomadhive/rewards/${rewardId}/redeem`, {}, { withCredentials: true });
      toast.success(response.data.message);
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Error al canjear recompensa');
    }
  };

  const copyReferralCode = () => {
    if (profile?.referral_code) {
      navigator.clipboard.writeText(profile.referral_code);
      toast.success('Código copiado al portapapeles');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F172A] mx-auto"></div>
          <p className="mt-4 text-slate-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/nomadhive" className="text-slate-300 hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8" />
                <div>
                  <h1 className="text-2xl font-bold">NomadHive</h1>
                  <p className="text-slate-400 text-sm">Panel de Impulsador</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Nivel: <span className="text-white font-semibold">{profile?.level}</span></p>
              <p className="text-xl font-bold text-[#F59E0B]">{profile?.total_points || 0} puntos</p>
            </div>
          </div>
        </div>
      </header>

      {/* TABS */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1">
            {[
              { id: 'overview', label: 'Resumen', icon: TrendingUp },
              { id: 'tasks', label: 'Tareas', icon: Target },
              { id: 'rewards', label: 'Recompensas', icon: Gift },
              { id: 'orders', label: 'Pedidos', icon: ShoppingBag },
              { id: 'leaderboard', label: 'Ranking', icon: Trophy }
            ].map(tab => (
              <button
                key={tab.id}
                data-testid={`nomadhive-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-[#0F766E] text-[#0F766E]' 
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Total Puntos</span>
                  <Star className="h-5 w-5 text-[#F59E0B]" />
                </div>
                <p className="text-3xl font-bold text-[#0F172A]">{profile?.total_points || 0}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Comisiones Ganadas</span>
                  <DollarSign className="h-5 w-5 text-[#0F766E]" />
                </div>
                <p className="text-3xl font-bold text-[#0F766E]">${profile?.stats?.total_commission?.toFixed(2) || '0.00'}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Pedidos Totales</span>
                  <ShoppingBag className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-3xl font-bold text-[#0F172A]">{profile?.stats?.total_orders || 0}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Referidos</span>
                  <Users className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-3xl font-bold text-[#0F172A]">{profile?.stats?.total_referrals || 0}</p>
              </div>
            </div>

            {/* Referral Code */}
            <div className="bg-gradient-to-r from-[#0F766E] to-[#0D9488] text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Tu Código de Referido</h3>
                  <p className="text-white/80 text-sm">Comparte este código y gana puntos cuando tus referidos se unan</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-mono font-bold bg-white/20 px-4 py-2 rounded-lg">
                    {profile?.referral_code || 'N/A'}
                  </span>
                  <button 
                    onClick={copyReferralCode}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/anma/tienda" className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#0F766E]/10 rounded-lg group-hover:bg-[#0F766E]/20 transition-colors">
                    <ShoppingBag className="h-6 w-6 text-[#0F766E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">Ir a Tienda ANMA</h3>
                    <p className="text-sm text-slate-600">Explora productos y registra pedidos</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-slate-400 ml-auto" />
                </div>
              </Link>
              <Link to="/inverfact" className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#F59E0B]/10 rounded-lg group-hover:bg-[#F59E0B]/20 transition-colors">
                    <TrendingUp className="h-6 w-6 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">Referir a Inverfact</h3>
                    <p className="text-sm text-slate-600">Gana bonos por referidos exitosos</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-slate-400 ml-auto" />
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0F172A]">Tareas y Misiones</h2>
            <p className="text-slate-600">Completa tareas para ganar puntos y subir de nivel</p>
            
            {['daily', 'weekly', 'onboarding'].map(category => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold text-[#0F172A] capitalize flex items-center gap-2">
                  {category === 'daily' && <Clock className="h-5 w-5 text-blue-500" />}
                  {category === 'weekly' && <Target className="h-5 w-5 text-purple-500" />}
                  {category === 'onboarding' && <Star className="h-5 w-5 text-amber-500" />}
                  {category === 'daily' ? 'Tareas Diarias' : category === 'weekly' ? 'Tareas Semanales' : 'Tareas de Inicio'}
                </h3>
                <div className="grid gap-4">
                  {tasks.filter(t => t.category === category).map(task => (
                    <div 
                      key={task.task_id}
                      className={`bg-white rounded-xl border p-4 flex items-center justify-between ${
                        task.is_completed ? 'border-green-200 bg-green-50' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {task.is_completed ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <div className="h-6 w-6 border-2 border-slate-300 rounded-full" />
                        )}
                        <div>
                          <h4 className="font-medium text-[#0F172A]">{task.title}</h4>
                          <p className="text-sm text-slate-600">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#F59E0B] font-semibold">+{task.points_reward} pts</span>
                        {!task.is_completed && (
                          <Button 
                            size="sm"
                            onClick={() => handleCompleteTask(task.task_id)}
                            className="bg-[#0F172A] hover:bg-[#1E293B]"
                          >
                            Completar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REWARDS TAB */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">Tienda de Recompensas</h2>
                <p className="text-slate-600">Canjea tus puntos por increíbles premios</p>
              </div>
              <div className="bg-[#F59E0B]/10 px-4 py-2 rounded-lg">
                <span className="text-sm text-slate-600">Tus puntos:</span>
                <span className="ml-2 text-xl font-bold text-[#F59E0B]">{profile?.total_points || 0}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map(reward => (
                <div 
                  key={reward.reward_id}
                  className={`bg-white rounded-xl border p-6 ${
                    reward.can_redeem ? 'border-[#0F766E]' : 'border-slate-200 opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className={`h-6 w-6 ${reward.can_redeem ? 'text-[#0F766E]' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold uppercase text-slate-500">{reward.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{reward.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#F59E0B] font-bold">{reward.points_cost} pts</span>
                    <Button
                      size="sm"
                      disabled={!reward.can_redeem}
                      onClick={() => handleRedeemReward(reward.reward_id)}
                      className={reward.can_redeem ? 'bg-[#0F766E] hover:bg-[#0D9488]' : ''}
                    >
                      {reward.can_redeem ? 'Canjear' : 'Puntos insuficientes'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">Mis Pedidos</h2>
                <p className="text-slate-600">Historial de pedidos gestionados</p>
              </div>
              <Link to="/anma/tienda">
                <Button className="bg-[#0F766E] hover:bg-[#0D9488]">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Nuevo Pedido
                </Button>
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <ShoppingBag className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">Sin pedidos todavía</h3>
                <p className="text-slate-500 mb-4">Comienza a gestionar pedidos de productos ANMA</p>
                <Link to="/anma/tienda">
                  <Button className="bg-[#0F172A] hover:bg-[#1E293B]">
                    Ir a la Tienda
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600">ID Pedido</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600">Productos</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600">Total</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600">Comisión</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.order_id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 font-mono text-sm">#{order.order_id.slice(-8)}</td>
                        <td className="px-6 py-4 text-sm">{order.products?.length || 0} items</td>
                        <td className="px-6 py-4 font-semibold">${order.total_amount?.toFixed(2)}</td>
                        <td className="px-6 py-4 text-[#0F766E] font-semibold">${order.commission_amount?.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.payment_status === 'paid' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.payment_status === 'paid' ? 'Pagado' : 'Pendiente'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* LEADERBOARD TAB */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0F172A]">Ranking de Impulsadores</h2>
            <p className="text-slate-600">Los mejores impulsadores de NomadHive</p>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {leaderboard.length === 0 ? (
                <div className="p-12 text-center">
                  <Trophy className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Sé el primero en el ranking</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {leaderboard.map((person, index) => (
                    <div 
                      key={person.user_id}
                      className={`flex items-center justify-between px-6 py-4 ${
                        person.user_id === profile?.user_id ? 'bg-[#0F766E]/5' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-[#F59E0B] text-white' :
                          index === 1 ? 'bg-slate-400 text-white' :
                          index === 2 ? 'bg-amber-700 text-white' :
                          'bg-slate-200 text-slate-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-[#0F172A]">
                            {person.name}
                            {person.user_id === profile?.user_id && (
                              <span className="ml-2 text-xs text-[#0F766E]">(Tú)</span>
                            )}
                          </p>
                          <p className="text-sm text-slate-500">Nivel: {person.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#F59E0B]">{person.total_points}</p>
                        <p className="text-xs text-slate-500">puntos</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardNomadHive;
