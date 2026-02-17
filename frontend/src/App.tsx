import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BuilderComponent } from "@builder.io/react";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardInverPulse from "./pages/DashboardInverPulse";
import DashboardInverfact from "./pages/DashboardInverfact";
import DashboardNomadHive from "./pages/DashboardNomadHive";
import AdminDashboard from "./pages/AdminDashboard";
import TiendaANMA from "./pages/TiendaANMA";
import LandingAO from "./pages/LandingAO";
import LandingANMA from "./pages/LandingANMA";
import LandingInverPulse from "./pages/LandingInverPulse";
import LandingInverfact from "./pages/LandingInverfact";
import LandingNomadHive from "./pages/LandingNomadHive";
import Terminos from "./pages/Terminos";
import Privacidad from "./pages/Privacidad";
import PaymentSuccess from "./pages/PaymentSuccess";
import AuthCallback from "./pages/AuthCallback";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/landing-ao" element={<LandingAO />} />
        <Route path="/landing-anma" element={<LandingANMA />} />
        <Route path="/landing-inverpulse" element={<LandingInverPulse />} />
        <Route path="/landing-inverfact" element={<LandingInverfact />} />
        <Route path="/landing-nomadhive" element={<LandingNomadHive />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard-inverpulse" element={<ProtectedRoute><DashboardInverPulse /></ProtectedRoute>} />
        <Route path="/dashboard-inverfact" element={<ProtectedRoute><DashboardInverfact /></ProtectedRoute>} />
        <Route path="/dashboard-nomadhive" element={<ProtectedRoute><DashboardNomadHive /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/tienda-anma" element={<ProtectedRoute><TiendaANMA /></ProtectedRoute>} />
        <Route path="*" element={<BuilderComponent model="page" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
