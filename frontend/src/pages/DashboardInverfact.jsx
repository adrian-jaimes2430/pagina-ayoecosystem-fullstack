import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { 
  TrendingDown, ArrowLeft, CheckCircle, Mail, Phone, User as UserIcon, 
  MessageSquare, Send, BookOpen, AlertCircle, Zap, DollarSign
} from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_API_URL;
const API = `${BACKEND_URL}/api`;

function DashboardInverfact() {
  const [user, setUser] = useState(null);
  const [strategies, setStrategies] = useState([]);
  const [hasActiveStrategies, setHasActiveStrategies] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interested_strategy: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userRes, strategiesRes] = await Promise.all([
        axios.get(`${API}/auth/me`, { withCredentials: true }),
        axios.get(`${API}/inverfact/user/strategies`, { withCredentials: true })
      ]);

      setUser(userRes.data);
      setStrategies(strategiesRes.data.strategies);
      setHasActiveStrategies(strategiesRes.data.has_active_strategies);
      
      // Pre-fill contact form with user data
      setContactForm(prev => ({
        ...prev,
        name: userRes.data.name || '',
        email: userRes.data.email || ''
      }));
    } catch (error) {
      toast.error('Error al cargar datos');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(`${API}/inverfact/contact`, contactForm);
      toast.success(response.data.message);
      setContactForm(prev => ({
        ...prev,
        message: '',
        interested_strategy: ''
      }));
    } catch (error) {
      toast.error('Error al enviar mensaje');
    } finally {
      setSubmitting(false);
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
      <header className="bg-[#0F172A] text-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/inverfact" className="text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Mi Portal Inverfact</h1>
                <p className="text-slate-400 text-sm">Panel de Inversor</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Bienvenido</p>
            <p className="font-semibold">{user?.name}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {hasActiveStrategies ? (
          /* ACTIVE STRATEGIES VIEW */
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A]">Estrategias Activas</h2>
                  <p className="text-slate-600">Tienes acceso a las siguientes estrategias de inversión</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {strategies.map((strategy) => (
                  <div 
                    key={strategy.strategy_id} 
                    className="bg-gradient-to-br from-[#0F766E]/5 to-[#0F766E]/10 border border-[#0F766E]/30 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#0F172A]">{strategy.name}</h3>
                        <span className="inline-block bg-[#0F766E] text-white text-xs px-2 py-1 rounded-full mt-1">
                          {strategy.category}
                        </span>
                      </div>
                      <CheckCircle className="h-6 w-6 text-[#0F766E]" />
                    </div>
                    <p className="text-slate-600 mb-4">{strategy.description}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <DollarSign className="h-4 w-4" />
                      <span>Depósito mínimo: ${strategy.min_deposit} USD</span>
                    </div>
                    {strategy.strategy_id === 'inverpulse' && (
                      <Link to="/inverpulse/dashboard">
                        <Button className="w-full mt-4 bg-[#F59E0B] hover:bg-[#D97706] text-white">
                          <Zap className="h-4 w-4 mr-2" />
                          Ir a InverPulse
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Educational Resources */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-6 w-6 text-[#0F172A]" />
                <h3 className="text-xl font-bold text-[#0F172A]">Recursos Educativos</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Próximamente tendrás acceso a material educativo exclusivo para cada estrategia activada.
              </p>
              <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-500">
                El equipo Inverfact te contactará para coordinar tu proceso de educación y acompañamiento.
              </div>
            </div>
          </div>
        ) : (
          /* NO ACTIVE STRATEGIES - CONTACT FORM */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="h-8 w-8 text-amber-500" />
                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A]">Sin Estrategias Activas</h2>
                  <p className="text-slate-600">Contacta al equipo Inverfact para activar tu proceso</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                <p className="text-amber-800">
                  <strong>Importante:</strong> Para acceder a las estrategias de inversión de Inverfact, 
                  primero debes completar un proceso de educación y verificación con nuestro equipo.
                  Completa el formulario a continuación y te contactaremos pronto.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-700 font-medium">Nombre Completo</Label>
                    <div className="relative mt-2">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="name"
                        data-testid="inverfact-contact-name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Tu nombre"
                        className="pl-10 h-12 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-medium">Correo Electrónico</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="email"
                        data-testid="inverfact-contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="tu@email.com"
                        className="pl-10 h-12 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-slate-700 font-medium">Teléfono (Opcional)</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="phone"
                      data-testid="inverfact-contact-phone"
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+57 300 123 4567"
                      className="pl-10 h-12 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="strategy" className="text-slate-700 font-medium">Estrategia de Interés</Label>
                  <select
                    id="strategy"
                    data-testid="inverfact-contact-strategy"
                    value={contactForm.interested_strategy}
                    onChange={(e) => setContactForm({ ...contactForm, interested_strategy: e.target.value })}
                    className="w-full mt-2 h-12 rounded-lg border border-slate-200 px-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  >
                    <option value="">Selecciona una estrategia</option>
                    <option value="gt_kwnex">Grupo GT - KWNEX (Trading + Blockchain)</option>
                    <option value="incruises">InCruises (Travel Rewards)</option>
                    <option value="trii">Trii (Acciones Colombia)</option>
                    <option value="inverpulse">InverPulse (Broker A&O)</option>
                    <option value="multiple">Múltiples estrategias</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-slate-700 font-medium">Mensaje</Label>
                  <div className="relative mt-2">
                    <Textarea
                      id="message"
                      data-testid="inverfact-contact-message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Cuéntanos sobre tu experiencia en inversiones, tus objetivos financieros y cualquier pregunta que tengas..."
                      className="min-h-[120px] rounded-lg resize-none"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  data-testid="inverfact-contact-submit"
                  disabled={submitting}
                  className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg font-semibold"
                >
                  {submitting ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Solicitud
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-slate-100 rounded-xl p-6 text-center">
              <p className="text-slate-600 mb-2">También puedes contactarnos directamente:</p>
              <a href="mailto:inverfactcol@gmail.com" className="text-[#0F766E] font-semibold hover:underline">
                inverfactcol@gmail.com
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardInverfact;
