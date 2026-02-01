import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import '@/App.css';

import LandingAO from '@/pages/LandingAO';
import LandingANMA from '@/pages/LandingANMA';
import LandingNomadHive from '@/pages/LandingNomadHive';
import LandingInverfact from '@/pages/LandingInverfact';
import LandingInverPulse from '@/pages/LandingInverPulse';
import TiendaANMA from '@/pages/TiendaANMA';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import AuthCallback from '@/pages/AuthCallback';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import DashboardInverPulse from '@/pages/DashboardInverPulse';
import DashboardInverfact from '@/pages/DashboardInverfact';
import ProtectedRoute from '@/components/ProtectedRoute';
import PaymentSuccess from '@/pages/PaymentSuccess';
import Terminos from '@/pages/Terminos';
import Privacidad from '@/pages/Privacidad';

function AppRouter() {
  const location = useLocation();
  
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<LandingAO />} />
      <Route path="/anma" element={<LandingANMA />} />
      <Route path="/anma/tienda" element={<TiendaANMA />} />
      <Route path="/nomadhive" element={<LandingNomadHive />} />
      <Route path="/inverfact" element={<LandingInverfact />} />
      <Route path="/inverpulse" element={<LandingInverPulse />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/terminos" element={<Terminos />} />
      <Route path="/privacidad" element={<Privacidad />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
      <Route path="/inverpulse/dashboard" element={<ProtectedRoute><DashboardInverPulse /></ProtectedRoute>} />
      <Route path="/inverfact/dashboard" element={<ProtectedRoute><DashboardInverfact /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;