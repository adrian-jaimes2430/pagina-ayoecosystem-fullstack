import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Zap, Users, TrendingUp, Shield, DollarSign, ArrowLeft, Plus, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function DashboardInverPulse() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [investors, setInvestors] = useState([]);
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const [pendingKYC, setPendingKYC] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [userRes, profileRes] = await Promise.all([
        axios.get(`${API}/auth/me`, { withCredentials: true }),
        axios.get(`${API}/inverpulse/profile`, { withCredentials: true })
      ]);

      setUser(userRes.data);
      setProfile(profileRes.data);

      // Si es admin, cargar datos adicionales
      if (userRes.data.role === 'super_admin') {
        const [investorsRes, depositsRes, kycRes, signalsRes] = await Promise.all([
          axios.get(`${API}/inverpulse/investors`, { withCredentials: true }),
          axios.get(`${API}/inverpulse/deposits/pending`, { withCredentials: true }),
          axios.get(`${API}/inverpulse/kyc/pending`, { withCredentials: true }),
          axios.get(`${API}/inverpulse/signals`, { withCredentials: true })
        ]);

        setInvestors(investorsRes.data.investors || []);
        setPendingDeposits(depositsRes.data.deposits || []);
        setPendingKYC(kycRes.data.pending_kyc || []);
        setSignals(signalsRes.data.signals || []);
      } else {
        const signalsRes = await axios.get(`${API}/inverpulse/signals`, { withCredentials: true });
        setSignals(signalsRes.data.signals || []);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error('No estás registrado en InverPulse');
        navigate('/inverpulse');
      } else {
        toast.error('Error al cargar datos');
      }
    } finally {
      setLoading(false);
    }
  };

  const confirmDeposit = async (depositId) => {
    try {
      await axios.post(
        `${API}/inverpulse/deposits/${depositId}/confirm`,
        { transaction_hash: `HASH_${Date.now()}` },
        { withCredentials: true }
      );
      toast.success('Depósito confirmado');
      loadDashboard();
    } catch (error) {
      toast.error('Error al confirmar depósito');
    }
  };

  const approveKYC = async (inversorId) => {
    try {
      await axios.post(
        `${API}/inverpulse/kyc/${inversorId}/review`,
        { status: 'approved' },
        { withCredentials: true }
      );
      toast.success('KYC aprobado');
      loadDashboard();
    } catch (error) {
      toast.error('Error al aprobar KYC');
    }
  };

  const updateLevel = async (inversorId, newLevel) => {
    try {
      await axios.post(
        `${API}/inverpulse/investors/${inversorId}/update-level`,
        { level: newLevel },
        { withCredentials: true }
      );
      toast.success(`Nivel actualizado a ${newLevel}`);
      loadDashboard();
    } catch (error) {
      toast.error('Error al actualizar nivel');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59E0B]"></div>
      </div>
    );
  }

  const isAdmin = user?.role === 'super_admin';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/dashboard')} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-2">
                <Zap className="h-8 w-8" strokeWidth={2.5} />
                <div>
                  <h1 className="text-2xl font-bold">InverPulse Dashboard</h1>
                  <p className="text-sm text-orange-100">{isAdmin ? 'Panel Administrativo' : 'Panel de Inversor'}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-orange-100">Nivel</p>
              <p className="text-2xl font-bold uppercase">{profile?.level}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* MI PERFIL */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Mi Perfil InverPulse</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-600 mb-1">Código de Referido</p>
              <p className="text-xl font-bold text-[#F59E0B] font-mono">{profile?.referral_code}</p>
              <p className="text-xs text-slate-500 mt-1">Comparte este código para referir inversores</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Depositado</p>
              <p className="text-xl font-bold text-[#0F172A]">${profile?.total_deposit?.toFixed(2) || '0.00'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Referidos Directos</p>
              <p className="text-xl font-bold text-[#0F172A]">{profile?.direct_referrals?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* ADMIN SECTION */}
        {isAdmin && (
          <>
            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-6 w-6 text-[#F59E0B]" />
                </div>
                <p className="text-3xl font-bold text-[#0F172A]">{investors.length}</p>
                <p className="text-sm text-slate-600">Total Inversores</p>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <p className="text-3xl font-bold text-yellow-600">{pendingDeposits.length}</p>
                <p className="text-sm text-slate-600">Depósitos Pendientes</p>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-blue-600">{pendingKYC.length}</p>
                <p className="text-sm text-slate-600">KYC Pendientes</p>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-green-600">{signals.length}</p>
                <p className="text-sm text-slate-600">Señales Activas</p>
              </div>
            </div>

            {/* DEPÓSITOS PENDIENTES */}
            {pendingDeposits.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">Depósitos Pendientes de Confirmación</h2>
                <div className="space-y-4">
                  {pendingDeposits.map(deposit => (
                    <div key={deposit.deposit_id} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#0F172A]">{deposit.inversor_info?.name}</p>
                        <p className="text-sm text-slate-600">{deposit.inversor_info?.email}</p>
                        <p className="text-lg font-bold text-[#F59E0B] mt-1">${deposit.amount.toFixed(2)}</p>
                      </div>
                      <Button
                        onClick={() => confirmDeposit(deposit.deposit_id)}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-lg"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirmar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* KYC PENDIENTES */}
            {pendingKYC.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">KYC Pendientes de Revisión</h2>
                <div className="space-y-4">
                  {pendingKYC.map(inversor => (
                    <div key={inversor.inversor_id} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#0F172A]">{inversor.name}</p>
                        <p className="text-sm text-slate-600">{inversor.email}</p>
                      </div>
                      <Button
                        onClick={() => approveKYC(inversor.inversor_id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Aprobar KYC
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LISTA DE INVERSORES */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">Todos los Inversores</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-slate-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-slate-600 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-4 text-slate-600 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-slate-600 font-semibold">Nivel</th>
                      <th className="text-left py-3 px-4 text-slate-600 font-semibold">Depósito</th>
                      <th className="text-left py-3 px-4 text-slate-600 font-semibold">KYC</th>
                      <th className="text-left py-3 px-4 text-slate-600 font-semibold">Referidos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investors.map(inv => (
                      <tr key={inv.inversor_id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium text-[#0F172A]">{inv.name}</td>
                        <td className="py-3 px-4 text-slate-600 text-sm">{inv.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F59E0B]/10 text-[#F59E0B] uppercase">
                            {inv.level}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#0F172A]">${inv.total_deposit?.toFixed(2) || '0.00'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${inv.kyc_status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {inv.kyc_status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{inv.direct_referrals?.length || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* SEÑALES OPERATIVAS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4">Señales Operativas Disponibles</h2>
          {signals.length === 0 ? (
            <p className="text-slate-600 text-center py-8">No hay señales activas en este momento</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {signals.map(signal => (
                <div key={signal.signal_id} className="border border-slate-200 rounded-lg p-4 hover:border-[#F59E0B] transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${signal.signal_type === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {signal.signal_type.toUpperCase()}
                      </span>
                      <span className="ml-2 font-bold text-xl text-[#0F172A]">{signal.asset}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Entrada:</span>
                      <span className="font-semibold text-[#0F172A]">${signal.entry_price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Objetivo:</span>
                      <span className="font-semibold text-green-600">${signal.target_price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Stop Loss:</span>
                      <span className="font-semibold text-red-600">${signal.stop_loss}</span>
                    </div>
                  </div>
                  {signal.notes && (
                    <p className="mt-3 text-xs text-slate-500 italic">{signal.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardInverPulse;
