import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Zap, Globe, ArrowRight, CheckCircle, BarChart3, Lock, Users, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';

const TRADING_IMAGE = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=srgb&fm=jpg&q=85";
const PLATFORM_IMAGE = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=srgb&fm=jpg&q=85";

function LandingInverPulse() {
  const [language, setLanguage] = useState('es');

  const content = {
    es: {
      nav: {
        about: 'Acerca de',
        platform: 'Plataforma',
        services: 'Servicios',
        login: 'Iniciar Sesión'
      },
      hero: {
        badge: 'Broker Propio · A&O Ecosystem',
        title: 'Plataforma Broker',
        titleHighlight: 'Profesional',
        subtitle: 'InverPulse es la plataforma broker propietaria del Ecosistema A&O. Trading avanzado, blockchain y tecnología de última generación para inversores profesionales.',
        ctaPrimary: 'Comenzar Ahora',
        ctaSecondary: 'Ver Plataforma'
      },
      users: {
        count: '200,000+',
        label: 'Usuarios Activos'
      },
      platform: {
        title: 'Introducción a la Plataforma',
        description: 'InverPulse es una plataforma de trading digital globalmente compatible, registrada y regulada, dedicada a proporcionar un entorno de trading seguro, conveniente y estable para usuarios de todo el mundo. Integramos un poderoso sistema de control de riesgos y arquitectura de seguridad de nivel empresarial.'
      },
      features: {
        title: 'Nuestras Ventajas',
        subtitle: 'Más de 200,000 usuarios de 150+ países operan con nosotros',
        secure: {
          title: 'Seguro y Estable',
          desc: 'Equipo tecnológico de primer nivel, seguridad integral y motor de coincidencia de alta velocidad autodesarrollado.'
        },
        professional: {
          title: 'Profesional y Confiable',
          desc: 'Equipo experimentado con experiencia en blockchain y finanzas, licencias de activos digitales compatibles y garantías de reserva del 100%.'
        },
        service: {
          title: 'Servicio Dedicado',
          desc: 'Cobertura de mercado global, soporte multilingüe, operaciones 24/7 y atención al cliente profesional.'
        },
        performance: {
          title: 'Alto Rendimiento',
          desc: '300,000 órdenes por segundo con tiempos de respuesta inferiores a 1 milisegundo.'
        }
      },
      trading: {
        title: 'Activos Disponibles',
        subtitle: 'Opera las principales criptomonedas del mercado',
        currencies: 'BTC, ETH, BNB, USDT, TRX, XRP, DOGE y más'
      },
      cta: {
        title: '¿Listo para Operar?',
        subtitle: 'Únete a InverPulse y accede a trading profesional con tecnología de vanguardia.',
        button: 'Registrarse Ahora'
      },
      footer: {
        about: 'Acerca de InverPulse',
        description: 'Plataforma broker propietaria del Ecosistema A&O con tecnología avanzada para trading profesional.',
        links: 'Enlaces',
        contact: 'Contacto',
        rights: '© 2025 InverPulse - A&O Ecosistema. Todos los derechos reservados.',
        disclaimer: 'Disclaimer: El trading de criptomonedas conlleva riesgos significativos. Opera responsablemente.'
      }
    },
    en: {
      nav: {
        about: 'About',
        platform: 'Platform',
        services: 'Services',
        login: 'Sign In'
      },
      hero: {
        badge: 'Proprietary Broker · A&O Ecosystem',
        title: 'Professional Broker',
        titleHighlight: 'Platform',
        subtitle: 'InverPulse is the proprietary broker platform of A&O Ecosystem. Advanced trading, blockchain, and cutting-edge technology for professional investors.',
        ctaPrimary: 'Get Started',
        ctaSecondary: 'View Platform'
      },
      users: {
        count: '200,000+',
        label: 'Active Users'
      },
      platform: {
        title: 'Platform Introduction',
        description: 'InverPulse is a globally compliant digital trading platform, registered and regulated, dedicated to providing a secure, convenient, and stable trading environment for users worldwide. We integrate a powerful risk control system and enterprise-grade security architecture.'
      },
      features: {
        title: 'Our Advantages',
        subtitle: 'Over 200,000 users from 150+ countries trade with us',
        secure: {
          title: 'Secure & Stable',
          desc: 'Top-tier technology team, comprehensive security, and self-developed high-speed matching engine.'
        },
        professional: {
          title: 'Professional & Reliable',
          desc: 'Experienced operations team with blockchain and finance expertise, compliant digital asset licenses, and 100% reserve guarantees.'
        },
        service: {
          title: 'Dedicated Service',
          desc: 'Global market coverage, multi-language support, 24/7 operations, and professional customer care.'
        },
        performance: {
          title: 'High Performance',
          desc: '300,000 orders per second with response times under 1 millisecond.'
        }
      },
      trading: {
        title: 'Available Assets',
        subtitle: 'Trade major market cryptocurrencies',
        currencies: 'BTC, ETH, BNB, USDT, TRX, XRP, DOGE and more'
      },
      cta: {
        title: 'Ready to Trade?',
        subtitle: 'Join InverPulse and access professional trading with cutting-edge technology.',
        button: 'Register Now'
      },
      footer: {
        about: 'About InverPulse',
        description: 'Proprietary broker platform of A&O Ecosystem with advanced technology for professional trading.',
        links: 'Links',
        contact: 'Contact',
        rights: '© 2025 InverPulse - A&O Ecosystem. All rights reserved.',
        disclaimer: 'Disclaimer: Cryptocurrency trading carries significant risks. Trade responsibly.'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-[#F59E0B]" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">InverPulse</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#plataforma" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">{t.nav.platform}</a>
            <a href="#servicios" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">{t.nav.services}</a>
            <a href="#trading" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Trading</a>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${language === 'es' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${language === 'en' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
              >
                EN
              </button>
            </div>
            <Link to="/login">
              <Button data-testid="inverpulse-header-login" className="bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-lg">{t.nav.login}</Button>
            </Link>
            <Link to="/inverpulse/dashboard">
              <Button data-testid="inverpulse-header-dashboard" variant="outline" className="rounded-lg border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white">Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <div className="inline-block bg-[#F59E0B]/10 text-[#F59E0B] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {t.hero.badge}
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight tracking-tight mb-6">
                {t.hero.title}
                <span className="block text-[#F59E0B] mt-2">{t.hero.titleHighlight}</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/register">
                  <Button data-testid="inverpulse-hero-register" size="lg" className="bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-lg px-8 py-6 text-lg font-semibold shadow-lg">
                    {t.hero.ctaPrimary}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#plataforma">
                  <Button data-testid="inverpulse-hero-learn" size="lg" variant="outline" className="rounded-lg px-8 py-6 text-lg font-semibold border-slate-300">
                    {t.hero.ctaSecondary}
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="h-5 w-5" />
                <span className="font-bold text-[#0F172A]">{t.users.count}</span>
                <span>{t.users.label}</span>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] animate-fade-in">
              <img src={TRADING_IMAGE} alt="Trading platform" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* PLATAFORMA */}
      <section id="plataforma" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px]">
              <img src={PLATFORM_IMAGE} alt="Platform dashboard" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl" />
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6 tracking-tight">{t.platform.title}</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {t.platform.description}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-700 font-medium">BTC, ETH, BNB, USDT, XRP, TRX, DOGE</p>
                    <p className="text-sm text-slate-600">Y otras criptomonedas de alta calidad</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-700 font-medium">Cold Wallets Offline</p>
                    <p className="text-sm text-slate-600">Mayoría de activos en almacenamiento seguro fuera de línea</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-700 font-medium">Motor de Alta Velocidad</p>
                    <p className="text-sm text-slate-600">Millones de transacciones por segundo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VENTAJAS */}
      <section id="servicios" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">{t.features.title}</h3>
            <p className="text-xl text-slate-600">{t.features.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all card-hover">
              <Shield className="h-12 w-12 text-[#F59E0B] mb-4" />
              <h4 className="text-xl font-bold text-[#0F172A] mb-3">{t.features.secure.title}</h4>
              <p className="text-slate-600">{t.features.secure.desc}</p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all card-hover">
              <Lock className="h-12 w-12 text-[#F59E0B] mb-4" />
              <h4 className="text-xl font-bold text-[#0F172A] mb-3">{t.features.professional.title}</h4>
              <p className="text-slate-600">{t.features.professional.desc}</p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all card-hover">
              <MessageSquare className="h-12 w-12 text-[#F59E0B] mb-4" />
              <h4 className="text-xl font-bold text-[#0F172A] mb-3">{t.features.service.title}</h4>
              <p className="text-slate-600">{t.features.service.desc}</p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all card-hover">
              <BarChart3 className="h-12 w-12 text-[#F59E0B] mb-4" />
              <h4 className="text-xl font-bold text-[#0F172A] mb-3">{t.features.performance.title}</h4>
              <p className="text-slate-600">{t.features.performance.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRADING */}
      <section id="trading" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">{t.trading.title}</h3>
            <p className="text-xl text-slate-600 mb-8">{t.trading.subtitle}</p>
            <p className="text-2xl font-bold text-[#F59E0B]">{t.trading.currencies}</p>
          </div>

          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8 rounded-2xl text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-[#F59E0B]" />
                <p className="text-3xl font-bold mb-1">300K</p>
                <p className="text-sm text-slate-300">Orders/sec</p>
              </div>
              <div>
                <Globe className="h-8 w-8 mx-auto mb-2 text-[#F59E0B]" />
                <p className="text-3xl font-bold mb-1">150+</p>
                <p className="text-sm text-slate-300">Countries</p>
              </div>
              <div>
                <Users className="h-8 w-8 mx-auto mb-2 text-[#F59E0B]" />
                <p className="text-3xl font-bold mb-1">200K+</p>
                <p className="text-sm text-slate-300">Users</p>
              </div>
              <div>
                <Zap className="h-8 w-8 mx-auto mb-2 text-[#F59E0B]" />
                <p className="text-3xl font-bold mb-1">&lt;1ms</p>
                <p className="text-sm text-slate-300">Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">{t.cta.title}</h3>
          <p className="text-xl text-orange-100 mb-8">
            {t.cta.subtitle}
          </p>
          <Link to="/register">
            <Button data-testid="inverpulse-footer-cta" size="lg" className="bg-white text-[#F59E0B] hover:bg-slate-100 rounded-lg px-8 py-6 text-lg font-semibold">
              {t.cta.button}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-8 bg-yellow-50 border-y border-yellow-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-yellow-800">
            <strong>{t.footer.disclaimer}</strong>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">{t.footer.about}</h4>
              <p className="text-slate-600 text-sm">{t.footer.description}</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">{t.footer.links}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/inverfact" className="text-slate-600 hover:text-slate-900 transition-colors">Inverfact</Link></li>
                <li><Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">A&O Ecosistema</Link></li>
                <li><Link to="/terminos" className="text-slate-600 hover:text-slate-900 transition-colors">Términos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 text-lg">{t.footer.contact}</h4>
              <p className="text-slate-600 text-sm">inverfactcol@gmail.com</p>
              <p className="text-slate-600 text-sm mt-2">infoayo.ecosistema@gmail.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-slate-600">
            <p>{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingInverPulse;
