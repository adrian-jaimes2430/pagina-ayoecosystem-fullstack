import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { Button } from '../components/ui/button';

function Privacidad() {
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
        <h1 className="text-4xl font-bold text-[#0F172A] mb-8">Política de Privacidad</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">1. Información que Recopilamos</h2>
            <p>
              A&O Ecosistema recopila información personal cuando usted se registra en nuestra plataforma, realiza una compra, 
              o interactúa con nuestros servicios. Esto incluye:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Información de pago (procesada por proveedores externos)</li>
              <li>Historial de pedidos y transacciones</li>
              <li>Datos de navegación y uso de la plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">2. Uso de la Información</h2>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Procesar pedidos y transacciones</li>
              <li>Gestionar cuentas de usuario</li>
              <li>Calcular y procesar comisiones de impulsadores</li>
              <li>Enviar notificaciones relacionadas con pedidos y servicios</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">3. Compartir Información</h2>
            <p>
              A&O Ecosistema no vende ni alquila su información personal a terceros. Podemos compartir información con:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Proveedores de servicios de pago (Stripe, PayPal)</li>
              <li>Proveedores de servicios de envío y logística</li>
              <li>Servicios de análisis y mejora de plataforma</li>
              <li>Autoridades legales cuando sea requerido por ley</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">4. Seguridad de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso 
              no autorizado, alteración, divulgación o destrucción. Esto incluye:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Encriptación de datos sensibles</li>
              <li>Autenticación segura de usuarios</li>
              <li>Almacenamiento seguro en servidores protegidos</li>
              <li>Auditorías regulares de seguridad</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">5. Cookies y Tecnologías Similares</h2>
            <p>
              Utilizamos cookies y tecnologías similares para mejorar la experiencia del usuario, analizar el uso de la plataforma 
              y personalizar contenido. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la 
              funcionalidad de algunos servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">6. Derechos del Usuario</h2>
            <p>
              Usted tiene derecho a:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Acceder a su información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de su cuenta</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Solicitar la portabilidad de sus datos</li>
            </ul>
            <p className="mt-4">
              Para ejercer estos derechos, contacte a: jaimesblandon.adrianfelipe@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">7. Retención de Datos</h2>
            <p>
              Retenemos su información personal durante el tiempo necesario para cumplir con los propósitos descritos en esta 
              política, salvo que la ley requiera un período de retención más largo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">8. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios significativos 
              publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">9. Contacto</h2>
            <p>
              Para preguntas sobre esta Política de Privacidad, por favor contacte a: jaimesblandon.adrianfelipe@gmail.com
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

export default Privacidad;
