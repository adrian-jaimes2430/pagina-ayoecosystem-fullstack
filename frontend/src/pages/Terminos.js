import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { Button } from './components/ui/button';

function Terminos() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-[#0F172A]" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">A&O Ecosistema</h1>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-[#0F172A] mb-8">Términos y Condiciones</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar la plataforma A&O Ecosistema y sus sub-marcas (ANMA Soluciones, NomadHive, Inverfact), 
              usted acepta cumplir y estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte 
              de estos términos, no debe utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">2. Uso de la Plataforma</h2>
            <p>
              A&O Ecosistema proporciona una plataforma para estructurar y escalar modelos de negocio digitales. Los usuarios 
              deben utilizar la plataforma de manera legal y conforme a todas las leyes aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">3. ANMA Soluciones - Dropshipping y Comisiones</h2>
            <p>
              ANMA Soluciones opera bajo un modelo de dropshipping. Los impulsadores ganan comisiones por ventas realizadas. 
              Las tasas de comisión varían según el producto y se especifican claramente en cada artículo. Los pagos de 
              comisiones se procesan mensualmente tras confirmación de pedidos y cumplimiento de términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">4. Pagos y Transacciones</h2>
            <p>
              Las transacciones de pago se procesan a través de proveedores externos seguros (Stripe, PayPal). A&O Ecosistema 
              no almacena información de tarjetas de crédito. Todos los precios están en USD salvo que se indique lo contrario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">5. Devoluciones y Reembolsos</h2>
            <p>
              Las políticas de devolución varían según el producto. Los usuarios pueden solicitar devoluciones dentro de 14 días 
              de la recepción del producto. Los reembolsos se procesan al método de pago original en un plazo de 7-14 días hábiles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">6. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de la plataforma, incluyendo logotipos, marcas, textos, gráficos y software, es propiedad de 
              A&O Ecosistema y está protegido por leyes de propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">7. Limitación de Responsabilidad</h2>
            <p>
              A&O Ecosistema no será responsable de daños indirectos, incidentales o consecuentes que surjan del uso de la plataforma. 
              Esto incluye, sin limitación, pérdida de beneficios, interrupciones comerciales o pérdida de información.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">8. Modificaciones a los Términos</h2>
            <p>
              A&O Ecosistema se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios 
              entrarán en vigor inmediatamente después de su publicación en la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">9. Contacto</h2>
            <p>
              Para preguntas sobre estos Términos y Condiciones, por favor contacte a: jaimesblandon.adrianfelipe@gmail.com
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-4">Última actualización: Enero 2025</p>
          <Link to="/">
            <Button variant="outline" className="rounded-lg">
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Terminos;
