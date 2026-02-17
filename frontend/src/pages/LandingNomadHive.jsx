import { Link } from 'react-router-dom';
import { Users, TrendingUp, Award, DollarSign, ArrowRight, Target, Gift, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';

const REMOTE_WORK = "https://images.unsplash.com/photo-1743865319740-32121cae5959?crop=entropy&cs=srgb&fm=jpg&q=85";
const TEAM_SUCCESS = "https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?crop=entropy&cs=srgb&fm=jpg&q=85";

function LandingNomadHive() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-8 w-8 text-[#0F172A]" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">NomadHive</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Cómo Funciona</a>
            <a href="#beneficios" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Beneficios</a>
            <a href="#ganancias" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Ganancias</a>
            <Link to="/login">
              <Button data-testid="nomadhive-header-login" className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg">Iniciar Sesión</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <div className="inline-block bg-[#0F172A]/10 text-[#0F172A] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Trabajo Remoto · Impulsadores de Marca
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight tracking-tight mb-6">
                Trabaja Remoto
                <span className="block text-[#0F766E] mt-2">Gana Comisiones</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                NomadHive es tu plataforma de trabajo remoto con modelo de impulsador de marca. Gestiona pedidos de productos ANMA, refiere inversores a Inverfact y gana comisiones por cada acción.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button data-testid="nomadhive-hero-register" size="lg" className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg px-8 py-6 text-lg font-semibold shadow-lg">
                    Ser Impulsador
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#como-funciona">
                  <Button data-testid="nomadhive-hero-learn" size="lg" variant="outline" className="rounded-lg px-8 py-6 text-lg font-semibold border-slate-300">
                    Conocer Más
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] animate-fade-in">
              <img src={REMOTE_WORK} alt="Trabajo remoto" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">Cómo Funciona NomadHive</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Modelo de impulsador de marca similar a Esika, Avon y Natura
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Regístrate</h4>
              <p className="text-slate-600">Crea tu cuenta como impulsador NomadHive. Sin contrato laboral, 100% remoto.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Gestiona Pedidos</h4>
              <p className="text-slate-600">Accede al catálogo de ANMA y sube pedidos de tus clientes desde tu dashboard.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Refiere Inversores</h4>
              <p className="text-slate-600">Invita personas a Inverfact y gana bonos cuando realicen su depósito inicial.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F59E0B] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Gana Comisiones</h4>
              <p className="text-slate-600">Recibe comisiones por pedidos y bonos por referidos exitosos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GANANCIAS */}
      <section id="ganancias" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">Cómo Ganas Dinero</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <Target className="h-12 w-12 text-[#0F766E] mb-4" />
              <h4 className="text-2xl font-bold text-[#0F172A] mb-4">Comisiones por Pedidos ANMA</h4>
              <p className="text-slate-600 mb-6">
                Gana entre 10% y 20% de comisión por cada pedido de productos ANMA que gestiones desde tu dashboard. Mientras más vendas, más ganas.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-slate-700">Ejemplo:</p>
                <p className="text-slate-600 text-sm mt-2">Pedido de $100 → Comisión 15% = <span className="font-bold text-[#0F766E]">$15 USD</span></p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <Gift className="h-12 w-12 text-[#F59E0B] mb-4" />
              <h4 className="text-2xl font-bold text-[#0F172A] mb-4">Bonos por Referidos Inverfact</h4>
              <p className="text-slate-600 mb-6">
                Recibe bonos cada vez que un inversor que referiste se registre en Inverfact y realice su depósito inicial en cualquier estrategia de inversión.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-slate-700">Ejemplo:</p>
                <p className="text-slate-600 text-sm mt-2">Inversor deposita $1,000 → Bono = <span className="font-bold text-[#F59E0B]">$50 USD</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px]">
              <img src={TEAM_SUCCESS} alt="Equipo exitoso" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl" />
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6 tracking-tight">Beneficios para Impulsadores</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <DollarSign className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Doble Fuente de Ingresos</h4>
                    <p className="text-slate-600">Gana por pedidos ANMA + bonos por referidos Inverfact.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Sin Contrato Laboral</h4>
                    <p className="text-slate-600">Modelo de contrato no laboral. Trabajas a tu ritmo y horario.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <BarChart3 className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Dashboard Profesional</h4>
                    <p className="text-slate-600">Gestiona pedidos, referidos, comisiones y pagos en un solo lugar.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Award className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Pagos Puntuales</h4>
                    <p className="text-slate-600">Recibe tus comisiones y bonos de forma transparente y puntual.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODELO INSPIRADO */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-[#0F172A] mb-6">Modelo Probado y Exitoso</h3>
          <p className="text-lg text-slate-600 mb-8">
            NomadHive se inspira en modelos exitosos de empresas como <span className="font-bold">Esika, Avon y Natura</span>, adaptado al mundo digital con contratos no laborales y trabajo 100% remoto.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">¿Listo para ser Impulsador?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Únete a NomadHive y comienza a generar ingresos desde casa con trabajo remoto flexible.
          </p>
          <Link to="/register">
            <Button data-testid="nomadhive-footer-cta" size="lg" className="bg-white text-[#0F172A] hover:bg-slate-100 rounded-lg px-8 py-6 text-lg font-semibold">
              Registrarse como Impulsador
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">NomadHive</h4>
              <p className="text-slate-600 text-sm">Parte del ecosistema A&O. Plataforma de trabajo remoto con modelo de impulsadores de marca.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">Enlaces</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/anma" className="text-slate-600 hover:text-slate-900 transition-colors">ANMA Soluciones</Link></li>
                <li><Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">A&O Ecosistema</Link></li>
                <li><Link to="/terminos" className="text-slate-600 hover:text-slate-900 transition-colors">Términos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">Contacto</h4>
              <p className="text-slate-600 text-sm">studio.ayosoluciones@gmail.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-slate-600">
            <p>&copy; 2025 NomadHive - A&O Ecosistema. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingNomadHive;
