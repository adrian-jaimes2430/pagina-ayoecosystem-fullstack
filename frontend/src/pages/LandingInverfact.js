import { Link } from 'react-router-dom';
import { TrendingDown, Shield, Users, DollarSign, ArrowRight, CheckCircle, AlertTriangle, FileText, Zap } from 'lucide-react';
import { Button } from './components/ui/button';

const FINANCE_IMAGE = "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?crop=entropy&cs=srgb&fm=jpg&q=85";
const CHART_IMAGE = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=srgb&fm=jpg&q=85";

function LandingInverfact() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-8 w-8 text-[#0F172A]" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Inverfact</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Cómo Funciona</a>
            <a href="#estrategias" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Estrategias</a>
            <a href="#comunidad" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Comunidad</a>
            <Link to="/login">
              <Button data-testid="inverfact-header-login" className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg">Iniciar Sesión</Button>
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
                Educación Financiera · Comunidad de Crecimiento
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight tracking-tight mb-6">
                Aprende a Crear
                <span className="block text-[#0F766E] mt-2">Capital Sostenible</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Inverfact es una comunidad de educación financiera enfocada en crecimiento a largo plazo con metodología comprobada por más de 10,300 personas a nivel mundial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button data-testid="inverfact-hero-register" size="lg" className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg px-8 py-6 text-lg font-semibold shadow-lg">
                    Unirme a la Comunidad
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#como-funciona">
                  <Button data-testid="inverfact-hero-learn" size="lg" variant="outline" className="rounded-lg px-8 py-6 text-lg font-semibold border-slate-300">
                    Conocer Más
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] animate-fade-in">
              <img src={FINANCE_IMAGE} alt="Análisis financiero" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ ES INVERFACT */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-[#0F172A] mb-6">¿Qué es Inverfact?</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Somos una <strong>comunidad de educación financiera</strong> que se basa en el crecimiento a largo plazo del capital con educación continua <strong>ANTES</strong> de invertir. No recibimos dinero directamente de los inversores. Te acompañamos con metodología probada para que aprendas a crear capital sostenible y tangible en diferentes estrategias de inversión.
          </p>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">Cómo Funciona</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Proceso educativo para aprender a invertir con acompañamiento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Regístrate</h4>
              <p className="text-slate-600">Únete a la comunidad Inverfact y accede a educación financiera.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Aprende</h4>
              <p className="text-slate-600">Recibe educación sólida sobre la estrategia que elijas antes de invertir.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Invierte</h4>
              <p className="text-slate-600">Realiza tu inversión en la plataforma correspondiente con nuestro acompañamiento.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F766E] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Crece</h4>
              <p className="text-slate-600">Construye capital sostenible a largo plazo con metodología comprobada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ESTRATEGIAS */}
      <section id="estrategias" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">Estrategias de Inversión</h3>
            <p className="text-slate-600 text-lg">Con educación y acompañamiento profesional</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Grupo GT-KWNEX */}
            <div className="bg-white border-2 border-[#0F766E] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all">
              <div className="inline-block bg-[#0F766E] text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">Trading · Blockchain</div>
              <h4 className="text-2xl font-bold text-[#0F172A] mb-2">Grupo GT - KWNEX</h4>
              <p className="text-slate-600 mb-6">Estrategia basada en trading y blockchain con metodología probada y acompañamiento continuo.</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Depósito mínimo: $100 USD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Trading + Blockchain</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Educación continua incluida</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">Requiere activación por equipo Inverfact tras educación inicial</p>
            </div>

            {/* InCruises */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <div className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">Ganancias Colaborativas</div>
              <h4 className="text-2xl font-bold text-[#0F172A] mb-2">InCruises</h4>
              <p className="text-slate-600 mb-6">Modelo de ganancias colaborativas en travel rewards club con membresías mensuales flexibles.</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Desde $50 USD/mes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Travel rewards + ingresos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Comunidad global</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">Requiere activación por equipo Inverfact tras educación inicial</p>
            </div>

            {/* Trii */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <div className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">Acciones · Fondos</div>
              <h4 className="text-2xl font-bold text-[#0F172A] mb-2">Trii</h4>
              <p className="text-slate-600 mb-6">Inversión en acciones y fondos de la Bolsa de Valores de Colombia con acompañamiento educativo.</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Desde $30 USD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Bolsa de valores Colombia</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Educación sólida incluida</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">Requiere activación por equipo Inverfact tras educación inicial</p>
            </div>

            {/* InverPulse - ACTIVO */}
            <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 border-2 border-[#F59E0B] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Zap className="h-8 w-8 text-[#F59E0B]" />
              </div>
              <div className="inline-block bg-[#F59E0B] text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">ACTIVO · Broker Propio</div>
              <h4 className="text-2xl font-bold text-[#0F172A] mb-2">InverPulse</h4>
              <p className="text-slate-600 mb-6">Plataforma broker propia de A&O Ecosystem. Modelo similar a Grupo GT con tecnología propietaria avanzada.</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#F59E0B]" />
                  <span className="text-sm text-slate-700">Trading avanzado BTC, ETH, BNB</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#F59E0B]" />
                  <span className="text-sm text-slate-700">Tecnología propietaria</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#F59E0B]" />
                  <span className="text-sm text-slate-700">Multilingüe (ES/EN)</span>
                </div>
              </div>
              <Link to="/inverpulse">
                <Button className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-lg font-semibold">
                  Ver Plataforma InverPulse
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMUNIDAD */}
      <section id="comunidad" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px]">
              <img src={CHART_IMAGE} alt="Comunidad de inversores" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl" />
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6 tracking-tight">Comunidad de Crecimiento</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Shield className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Educación ANTES de Invertir</h4>
                    <p className="text-slate-600">Metodología sólida comprobada por 10,300+ personas a nivel mundial.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FileText className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Acompañamiento Continuo</h4>
                    <p className="text-slate-600">No estás solo. Te acompañamos en cada paso de tu proceso de inversión.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <DollarSign className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Capital Sostenible</h4>
                    <p className="text-slate-600">Enfoque en crecimiento a largo plazo, no promesas de riqueza rápida.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Sistema de Referidos</h4>
                    <p className="text-slate-600">Los impulsadores de NomadHive reciben bonos al referir inversores activos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-16 bg-yellow-50 border-y border-yellow-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-4 items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-700 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-yellow-900 mb-2">Advertencia Importante</h4>
              <p className="text-sm text-yellow-800">
                <strong>Inverfact es una comunidad educativa, no una institución financiera.</strong> No recibimos dinero de inversores. Te educamos y acompañamos para que inviertas directamente en las plataformas oficiales (Grupo GT, InCruises, Trii). Toda inversión implica riesgos. Los resultados pasados no garantizan resultados futuros. Consulta con un asesor profesional antes de invertir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">¿Listo para Aprender?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Únete a la comunidad Inverfact y comienza tu camino hacia capital sostenible con educación sólida.
          </p>
          <Link to="/register">
            <Button data-testid="inverfact-footer-cta" size="lg" className="bg-white text-[#0F172A] hover:bg-slate-100 rounded-lg px-8 py-6 text-lg font-semibold">
              Unirme a la Comunidad
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
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">Inverfact</h4>
              <p className="text-slate-600 text-sm">Parte del ecosistema A&O. Comunidad de educación financiera para crear capital sostenible.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">Enlaces</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/nomadhive" className="text-slate-600 hover:text-slate-900 transition-colors">NomadHive</Link></li>
                <li><Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">A&O Ecosistema</Link></li>
                <li><Link to="/terminos" className="text-slate-600 hover:text-slate-900 transition-colors">Términos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">Contacto</h4>
              <p className="text-slate-600 text-sm">inverfactcol@gmail.com</p>
              <p className="text-slate-600 text-sm mt-2">infoayo.ecosistema@gmail.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-slate-600">
            <p>© 2025 Inverfact - A&O Ecosistema. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingInverfact;
