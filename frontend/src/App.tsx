import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import PublicPage from "./pages/PublicPage";
import Dashboard from "./pages/Dashboard";
import DashboardInverPulse from "./pages/DashboardInverPulse";
import DashboardInverfact from "./pages/DashboardInverfact";
import DashboardNomadHive from "./pages/DashboardNomadHive";
import AdminDashboard from "./pages/AdminDashboard";
import TiendaANMA from "./pages/TiendaANMA";
import AuthCallback from "./pages/AuthCallback";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<PublicPage />} />
        <Route path="/register" element={<PublicPage />} />
        <Route path="/terminos" element={<PublicPage />} />
        <Route path="/privacidad" element={<PublicPage />} />
        <Route path="/landing-ao" element={<PublicPage />} />
        <Route path="/landing-anma" element={<PublicPage />} />
        <Route path="/landing-inverpulse" element={<PublicPage />} />
        <Route path="/landing-inverfact" element={<PublicPage />} />
        <Route path="/landing-nomadhive" element={<PublicPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard-inverpulse" element={<ProtectedRoute><DashboardInverPulse /></ProtectedRoute>} />
        <Route path="/dashboard-inverfact" element={<ProtectedRoute><DashboardInverfact /></ProtectedRoute>} />
        <Route path="/dashboard-nomadhive" element={<ProtectedRoute><DashboardNomadHive /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/tienda-anma" element={<ProtectedRoute><TiendaANMA /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
