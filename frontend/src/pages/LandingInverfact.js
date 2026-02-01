import { Link } from 'react-router-dom';
import { TrendingDown, Shield, Users, DollarSign, ArrowRight, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <a href="#transparencia" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Transparencia</a>
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
                Inversión Estructurada · Fase Inicial
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight tracking-tight mb-6">
                Invierte Inteligente
                <span className="block text-[#0F766E] mt-2">Crece con Transparencia</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Inverfact es tu plataforma de inversión estructurada con modelo de referidos. Accede a estrategias de inversión profesionales con total transparencia y trazabilidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button data-testid="inverfact-hero-register" size="lg" className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg px-8 py-6 text-lg font-semibold shadow-lg">
                    Comenzar a Invertir
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

      {/* ADVERTENCIA LEGAL */}
      <section className="py-8 bg-yellow-50 border-y border-yellow-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-4 items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-700 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-yellow-900 mb-2">Advertencia Legal Importante</h4>
              <p className="text-sm text-yellow-800">
                <strong>Inverfact está en fase inicial de desarrollo tecnológico.</strong> No garantizamos rendimientos fijos. Toda inversión implica riesgos. Esta plataforma es educativa y experimental. Consulta con un asesor financiero antes de invertir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">Cómo Funciona</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Proceso transparente para acceder a inversión estructurada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Regístrate</h4>
              <p className="text-slate-600">Crea tu cuenta en Inverfact y completa el proceso de verificación.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Elige Estrategia</h4>
              <p className="text-slate-600">Selecciona la estrategia de inversión que se ajuste a tu perfil de riesgo.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F172A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Depósito Inicial</h4>
              <p className="text-slate-600">Realiza tu depósito inicial en la estrategia seleccionada.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F766E] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Monitorea</h4>
              <p className="text-slate-600">Rastrea tu inversión y rendimientos desde tu dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ESTRATEGIAS */}
      <section id="estrategias" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">Estrategias de Inversión</h3>
            <p className="text-slate-600 text-lg">Fase inicial - Modelos en desarrollo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <h4 className="text-2xl font-bold text-[#0F172A] mb-2">Conservadora</h4>
              <p className="text-slate-600 mb-6">Perfil de bajo riesgo con enfoque en estabilidad y capital protegido.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Depósito mínimo: $500</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Riesgo: Bajo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Plazo: Flexible</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#0F766E] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all">
              <div className="inline-block bg-[#0F766E] text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">Recomendada</div>
              <h4 className="text-2xl font-bold text-[#0F172A] mb-2">Moderada</h4>
              <p className="text-slate-600 mb-6">Balance entre riesgo y potencial de crecimiento a mediano plazo.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Depósito mínimo: $1,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Riesgo: Medio</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Plazo: 6-12 meses</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <h4 className="text-2xl font-bold text-[#0F172A] mb-2">Agresiva</h4>
              <p className="text-slate-600 mb-6">Mayor potencial de crecimiento con perfil de alto riesgo.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Depósito mínimo: $2,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Riesgo: Alto</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#0F766E]" />
                  <span className="text-sm text-slate-600">Plazo: 12+ meses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENCIA */}
      <section id="transparencia" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px]">
              <img src={CHART_IMAGE} alt="Gráficas financieras" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl" />
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6 tracking-tight">Transparencia y Trazabilidad</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Shield className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Sin Promesas Irreales</h4>
                    <p className="text-slate-600">No garantizamos rendimientos fijos. Toda inversión implica riesgos reales.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FileText className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Documentación Legal</h4>
                    <p className="text-slate-600">Todos los términos, riesgos y disclaimers claramente documentados.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <DollarSign className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Trazabilidad Completa</h4>
                    <p className="text-slate-600">Rastrea cada movimiento de tu inversión desde tu dashboard.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Modelo de Referidos</h4>
                    <p className="text-slate-600">Los impulsadores de NomadHive reciben bonos al referir inversores.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-16 bg-red-50 border-y border-red-200">
        <div className="max-w-4xl mx-auto px-6">
          <h4 className="font-bold text-red-900 mb-4 text-xl">⚠️ Disclaimers Importantes</h4>
          <ul className="space-y-2 text-sm text-red-800">
            <li className="flex gap-2"><span>•</span><span>Inverfact es una plataforma experimental en fase inicial de desarrollo tecnológico.</span></li>
            <li className="flex gap-2"><span>•</span><span>No somos una institución financiera regulada. Consulta a un asesor profesional.</span></li>
            <li className="flex gap-2"><span>•</span><span>No garantizamos rendimientos. Los resultados pasados no garantizan resultados futuros.</span></li>
            <li className="flex gap-2"><span>•</span><span>Toda inversión conlleva riesgos de pérdida parcial o total del capital.</span></li>
            <li className="flex gap-2"><span>•</span><span>Lee completamente los términos y condiciones antes de invertir.</span></li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">¿Listo para Invertir?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Únete a Inverfact y accede a estrategias de inversión estructuradas con total transparencia.
          </p>
          <Link to="/register">
            <Button data-testid="inverfact-footer-cta" size="lg" className="bg-white text-[#0F172A] hover:bg-slate-100 rounded-lg px-8 py-6 text-lg font-semibold">
              Registrarse en Inverfact
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
              <p className="text-slate-600 text-sm">Parte del ecosistema A&O. Plataforma de inversión estructurada con modelo de referidos.</p>
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
              <p className="text-slate-600 text-sm">jaimesblandon.adrianfelipe@gmail.com</p>
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
