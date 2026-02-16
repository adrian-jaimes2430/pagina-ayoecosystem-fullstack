import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { CheckCircle, Loader } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = import.meta.env.VITE_API_URL;
const API = `${BACKEND_URL}/api`;

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('checking');
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      navigate('/anma/tienda');
      return;
    }

    pollPaymentStatus(sessionId);
  }, []);

  const pollPaymentStatus = async (sessionId, currentAttempt = 0) => {
    const maxAttempts = 5;
    const pollInterval = 2000;

    if (currentAttempt >= maxAttempts) {
      setStatus('timeout');
      toast.error('No se pudo verificar el pago. Por favor contacta a soporte.');
      return;
    }

    try {
      const response = await axios.get(`${API}/payments/stripe/status/${sessionId}`, {
        withCredentials: true
      });

      if (response.data.payment_status === 'paid') {
        setStatus('success');
        toast.success('¡Pago confirmado!');
        return;
      }

      if (response.data.status === 'expired') {
        setStatus('expired');
        toast.error('La sesión de pago expiró');
        return;
      }

      setAttempts(currentAttempt + 1);
      setTimeout(() => pollPaymentStatus(sessionId, currentAttempt + 1), pollInterval);
    } catch (error) {
      setStatus('error');
      toast.error('Error al verificar el pago');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center">
        {status === 'checking' && (
          <>
            <Loader className="h-16 w-16 text-[#0F766E] mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Verificando Pago...</h2>
            <p className="text-slate-600">Estamos confirmando tu transacción. Por favor espera.</p>
            <p className="text-sm text-slate-500 mt-4">Intento {attempts + 1} de 5</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">¡Pago Exitoso!</h2>
            <p className="text-slate-600 mb-6">
              Tu pago ha sido procesado correctamente. Recibirás un email con los detalles de tu pedido.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                data-testid="goto-dashboard-btn"
                onClick={() => navigate('/dashboard')}
                className="bg-[#0F766E] hover:bg-[#0D5F58] text-white rounded-lg w-full"
              >
                Ir a Mi Dashboard
              </Button>
              <Button
                data-testid="goto-store-btn"
                onClick={() => navigate('/anma/tienda')}
                variant="outline"
                className="rounded-lg w-full"
              >
                Seguir Comprando
              </Button>
            </div>
          </>
        )}

        {status === 'timeout' && (
          <>
            <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⏱️</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Verificación Pendiente</h2>
            <p className="text-slate-600 mb-6">
              No pudimos verificar tu pago inmediatamente. Por favor revisa tu email o contacta a soporte.
            </p>
            <Button onClick={() => navigate('/dashboard')} variant="outline" className="rounded-lg w-full">
              Ir a Dashboard
            </Button>
          </>
        )}

        {status === 'expired' && (
          <>
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Sesión Expirada</h2>
            <p className="text-slate-600 mb-6">
              La sesión de pago expiró. Por favor intenta de nuevo.
            </p>
            <Button onClick={() => navigate('/anma/tienda')} className="bg-[#0F766E] hover:bg-[#0D5F58] text-white rounded-lg w-full">
              Volver a la Tienda
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Error</h2>
            <p className="text-slate-600 mb-6">
              Hubo un error al verificar tu pago. Por favor contacta a soporte.
            </p>
            <Button onClick={() => navigate('/dashboard')} variant="outline" className="rounded-lg w-full">
              Ir a Dashboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess;
