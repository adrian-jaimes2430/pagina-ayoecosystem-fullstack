import { Link } from 'react-router-dom';
import { Package, TrendingUp, Truck, MessageSquare, ArrowRight, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LOGISTICS_IMAGE = "https://images.unsplash.com/photo-1768796373360-95d80c5830fb?crop=entropy&cs=srgb&fm=jpg&q=85";
const REMOTE_AGENT = "https://images.unsplash.com/photo-1743865319740-32121cae5959?crop=entropy&cs=srgb&fm=jpg&q=85";

function LandingANMA() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-[#0F766E]" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">ANMA Soluciones</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Cómo Funciona</a>
            <Link to="/anma/tienda" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Tienda</Link>
            <a href="#impulsadores" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Impulsadores</a>
            <Link to="/login">
              <Button data-testid="anma-header-login" className="bg-[#0F766E] hover:bg-[#0D5F58] text-white rounded-lg">Iniciar Sesión</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <div className="inline-block bg-[#0F766E]/10 text-[#0F766E] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                E-commerce & Dropshipping
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight tracking-tight mb-6">
                Tu Tienda de
                <span className="block text-[#0F766E] mt-2">Productos Trending</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                ANMA Soluciones es tu centro de dropshipping y e-commerce. Descubre productos de salud, belleza, temporada y virales. Compra directo sin intermediarios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/anma/tienda">
                  <Button data-testid="anma-hero-cta-tienda" size="lg" className="bg-[#0F766E] hover:bg-[#0D5F58] text-white rounded-lg px-8 py-6 text-lg font-semibold shadow-lg">
                    Ver Productos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button data-testid="anma-hero-cta-register" size="lg" variant="outline" className="rounded-lg px-8 py-6 text-lg font-semibold border-slate-300">
                    Ser Impulsador
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] animate-fade-in">
              <img src={LOGISTICS_IMAGE} alt="Logística y almacén" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl" />
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
              Proceso simple y transparente para vender y ganar comisiones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F766E] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Regístrate</h4>
              <p className="text-slate-600">Crea tu cuenta como impulsador ANMA y accede al catálogo completo.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F766E] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Promociona</h4>
              <p className="text-slate-600">Comparte productos con tus clientes usando tu enlace único de impulsador.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F766E] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Gestión Automática</h4>
              <p className="text-slate-600">Nosotros nos encargamos del envío, devoluciones y soporte al cliente.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F59E0B] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Recibe Comisiones</h4>
              <p className="text-slate-600">Gana hasta 20% de comisión por cada venta confirmada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px]">
              <img src={REMOTE_AGENT} alt="Trabajo remoto" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl" />
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6 tracking-tight">Beneficios para Impulsadores</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <DollarSign className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Comisiones Competitivas</h4>
                    <p className="text-slate-600">Gana entre 10% y 20% por cada venta según el producto.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Truck className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Sin Gestión de Logística</h4>
                    <p className="text-slate-600">Nosotros manejamos inventario, envíos y devoluciones.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MessageSquare className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Soporte con LucidBot</h4>
                    <p className="text-slate-600">IA que te ayuda a responder dudas de clientes 24/7.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <TrendingUp className="h-8 w-8 text-[#0F766E] flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2">Dashboard Profesional</h4>
                    <p className="text-slate-600">Rastrea tus ventas, comisiones y pagos en tiempo real.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0F766E] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">¿Listo para comenzar a vender?</h3>
          <p className="text-xl text-teal-100 mb-8">
            Únete a ANMA Soluciones y comienza a generar ingresos desde casa.
          </p>
          <Link to="/register">
            <Button data-testid="anma-footer-cta" size="lg" className="bg-white text-[#0F766E] hover:bg-slate-100 rounded-lg px-8 py-6 text-lg font-semibold">
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
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">ANMA Soluciones</h4>
              <p className="text-slate-600 text-sm">Parte del ecosistema A&O. Dropshipping y ventas digitales profesionales.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">Enlaces</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/anma/tienda" className="text-slate-600 hover:text-slate-900 transition-colors">Tienda</Link></li>
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
            <p>&copy; 2025 ANMA Soluciones - A&O Ecosistema. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingANMA;
