import { Link } from 'react-router-dom';
import { Building2, TrendingUp, Users, Shield, ArrowRight, Package, MessageSquare, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HERO_IMAGE = "https://images.unsplash.com/photo-1760124056883-732e7a5e2e68?crop=entropy&cs=srgb&fm=jpg&q=85";
const TEAM_IMAGE = "https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?crop=entropy&cs=srgb&fm=jpg&q=85";

function LandingAO() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-[#0F172A]" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">A&O Ecosistema</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#quienes-somos" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Quiénes Somos</a>
            <a href="#submarcas" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Sub-marcas</a>
            <a href="#valores" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Valores</a>
            <Link to="/login">
              <Button data-testid="header-login-btn" variant="outline" className="rounded-lg">Iniciar Sesión</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="col-span-1 lg:col-span-7 animate-slide-in">
              <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight tracking-tight mb-6">
                Estructuramos y Escalamos
                <span className="block text-[#0F766E] mt-2">Modelos de Negocio</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
                Integramos marketing, inversión, comercio digital y trabajo remoto bajo un ecosistema empresarial sólido, legal y profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button data-testid="hero-cta-register" size="lg" className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg px-8 py-6 text-lg font-semibold shadow-lg">
                    Únete al Ecosistema
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#submarcas">
                  <Button data-testid="hero-cta-explore" size="lg" variant="outline" className="rounded-lg px-8 py-6 text-lg font-semibold border-slate-300">
                    Explorar Sub-marcas
                  </Button>
                </a>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-5 relative h-[400px] lg:h-[600px] animate-fade-in">
              <img src={HERO_IMAGE} alt="Edificios corporativos modernos" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section id="quienes-somos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">Quiénes Somos</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Company A&O Ecosystem es una marca matriz empresarial que estructura, regula y escala diferentes modelos de negocio digitales, de inversión y de comercio electrónico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-8 rounded-2xl card-hover">
              <Shield className="h-12 w-12 text-[#0F766E] mb-4" />
              <h4 className="text-xl font-bold text-[#0F172A] mb-3">Estándares Legales</h4>
              <p className="text-slate-600">Operamos bajo cumplimiento legal y transparencia total en todos nuestros procesos empresariales.</p>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-8 rounded-2xl card-hover">
              <TrendingUp className="h-12 w-12 text-[#0F766E] mb-4" />
              <h4 className="text-xl font-bold text-[#0F172A] mb-3">Escalabilidad</h4>
              <p className="text-slate-600">Diseñamos estructuras preparadas para crecer y adaptarse a las necesidades del mercado.</p>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-8 rounded-2xl card-hover">
              <Users className="h-12 w-12 text-[#0F766E] mb-4" />
              <h4 className="text-xl font-bold text-[#0F172A] mb-3">Ecosistema Integrado</h4>
              <p className="text-slate-600">Conectamos marketing, ventas, inversión y trabajo remoto en una sola plataforma corporativa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SUB-MARCAS */}
      <section id="submarcas" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">Nuestras Sub-marcas</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Cada marca opera con autonomía pero bajo los estándares corporativos del ecosistema A&O.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all p-8 rounded-2xl card-hover">
              <Package className="h-12 w-12 text-[#0F766E] mb-4" />
              <h4 className="text-2xl font-bold text-[#0F172A] mb-3">ANMA Soluciones</h4>
              <p className="text-slate-600 mb-6">Dropshipping, e-commerce y ventas digitales con modelo de impulsadores y trabajo remoto.</p>
              <Link to="/anma">
                <Button data-testid="anma-card-btn" className="bg-[#0F766E] hover:bg-[#0D5F58] text-white rounded-lg w-full">
                  Conocer ANMA
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all p-8 rounded-2xl card-hover opacity-60">
              <Users className="h-12 w-12 text-slate-400 mb-4" />
              <h4 className="text-2xl font-bold text-[#0F172A] mb-3">NomadHive</h4>
              <p className="text-slate-600 mb-6">Plataforma de trabajo remoto por impulso de marca, basada en desempeño y tareas.</p>
              <Button disabled className="bg-slate-300 text-slate-500 rounded-lg w-full cursor-not-allowed">
                Próximamente
              </Button>
            </div>

            <div className="bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all p-8 rounded-2xl card-hover opacity-60">
              <TrendingDown className="h-12 w-12 text-slate-400 mb-4" />
              <h4 className="text-2xl font-bold text-[#0F172A] mb-3">Inverfact</h4>
              <p className="text-slate-600 mb-6">Modelo de referidos e inversión estructurada con transparencia y trazabilidad.</p>
              <Button disabled className="bg-slate-300 text-slate-500 rounded-lg w-full cursor-not-allowed">
                Próximamente
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section id="valores" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6 tracking-tight">Valores Institucionales</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-[#0F172A] mb-2">Transparencia</h4>
                  <p className="text-slate-600">Operamos con claridad total en procesos, inversiones y comisiones.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0F172A] mb-2">Profesionalismo</h4>
                  <p className="text-slate-600">Mantenemos estándares corporativos en todas nuestras operaciones.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0F172A] mb-2">Innovación</h4>
                  <p className="text-slate-600">Integramos tecnología y metodologías modernas para escalar modelos de negocio.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0F172A] mb-2">Compromiso Legal</h4>
                  <p className="text-slate-600">Cumplimos con regulaciones y protegemos los intereses de colaboradores e inversionistas.</p>
                </div>
              </div>
            </div>
            <div className="relative h-[500px]">
              <img src={TEAM_IMAGE} alt="Equipo de negocios en reunión" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">¿Listo para formar parte del Ecosistema?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Únete a empresarios, inversionistas y colaboradores que están construyendo el futuro del comercio digital.
          </p>
          <Link to="/register">
            <Button data-testid="footer-cta-register" size="lg" className="bg-white text-[#0F172A] hover:bg-slate-100 rounded-lg px-8 py-6 text-lg font-semibold">
              Registrarse Ahora
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
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">A&O Ecosistema</h4>
              <p className="text-slate-600 text-sm">Estructuramos, escalamos y profesionalizamos modelos de negocio bajo un ecosistema empresarial sólido y legal.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">Enlaces</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terminos" className="text-slate-600 hover:text-slate-900 transition-colors">Términos y Condiciones</Link></li>
                <li><Link to="/privacidad" className="text-slate-600 hover:text-slate-900 transition-colors">Política de Privacidad</Link></li>
                <li><a href="#quienes-somos" className="text-slate-600 hover:text-slate-900 transition-colors">Quiénes Somos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">Contacto</h4>
              <p className="text-slate-600 text-sm">jaimesblandon.adrianfelipe@gmail.com</p>
              <p className="text-slate-600 text-sm mt-2">ayoecosistema.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-slate-600">
            <p>&copy; 2025 A&O Ecosistema. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingAO;