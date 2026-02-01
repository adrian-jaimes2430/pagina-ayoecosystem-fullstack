import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Users, Package, ShoppingBag, DollarSign, LogOut, Plus, Edit, Building2,
  TrendingDown, Zap, UserCog, CheckCircle, XCircle, ChevronRight, Settings
} from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Available Inverfact strategies
const STRATEGIES = [
  { id: 'gt_kwnex', name: 'Grupo GT - KWNEX', category: 'trading' },
  { id: 'incruises', name: 'InCruises', category: 'travel' },
  { id: 'trii', name: 'Trii', category: 'stocks' },
  { id: 'inverpulse', name: 'InverPulse', category: 'broker' }
];

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [inverfactUsers, setInverfactUsers] = useState([]);
  const [inverpulseInvestors, setInverpulseInvestors] = useState([]);
  const [activeSection, setActiveSection] = useState('overview');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', commission_rate: '', category: '', image_url: '', stock: 999
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const [userRes, statsRes, productsRes, usersRes] = await Promise.all([
        axios.get(`${API}/auth/me`, { withCredentials: true }),
        axios.get(`${API}/stats/dashboard`, { withCredentials: true }),
        axios.get(`${API}/products`, { withCredentials: true }),
        axios.get(`${API}/users`, { withCredentials: true })
      ]);

      setUser(userRes.data);
      setStats(statsRes.data);
      setProducts(productsRes.data);
      setUsers(usersRes.data);

      // Load Inverfact users with strategies
      try {
        const inverfactRes = await axios.get(`${API}/inverfact/admin/users-strategies`, { withCredentials: true });
        setInverfactUsers(inverfactRes.data.users);
      } catch (e) {
        console.log('Inverfact data not available');
      }

      // Load InverPulse investors
      try {
        const inverpulseRes = await axios.get(`${API}/inverpulse/investors`, { withCredentials: true });
        setInverpulseInvestors(inverpulseRes.data.investors);
      } catch (e) {
        console.log('InverPulse data not available');
      }
    } catch (error) {
      toast.error('Error al cargar datos administrativos');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  const handleSaveProduct = async () => {
    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        commission_rate: parseFloat(productForm.commission_rate),
        stock: parseInt(productForm.stock)
      };

      if (editingProduct) {
        await axios.put(`${API}/products/${editingProduct.product_id}`, productData, { withCredentials: true });
        toast.success('Producto actualizado');
      } else {
        await axios.post(`${API}/products`, productData, { withCredentials: true });
        toast.success('Producto creado');
      }

      setShowProductModal(false);
      setEditingProduct(null);
      setProductForm({ name: '', description: '', price: '', commission_rate: '', category: '', image_url: '', stock: 999 });
      loadAdminData();
    } catch (error) {
      toast.error('Error al guardar producto');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      commission_rate: product.commission_rate.toString(),
      category: product.category,
      image_url: product.image_url,
      stock: product.stock
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('¿Estás seguro de desactivar este producto?')) return;
    try {
      await axios.delete(`${API}/products/${productId}`, { withCredentials: true });
      toast.success('Producto desactivado');
      loadAdminData();
    } catch (error) {
      toast.error('Error al desactivar producto');
    }
  };

  const handleToggleStrategy = async (userId, strategyId, isActive) => {
    try {
      if (isActive) {
        await axios.delete(`${API}/inverfact/admin/users/${userId}/strategies/${strategyId}`, { withCredentials: true });
        toast.success('Estrategia desactivada');
      } else {
        await axios.post(`${API}/inverfact/admin/users/${userId}/strategies`, { strategy_id: strategyId }, { withCredentials: true });
        toast.success('Estrategia activada');
      }
      loadAdminData();
    } catch (error) {
      toast.error('Error al actualizar estrategia');
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await axios.put(`${API}/users/${userId}/role`, { role: newRole }, { withCredentials: true });
      toast.success('Rol actualizado');
      loadAdminData();
    } catch (error) {
      toast.error('Error al actualizar rol');
    }
  };

  if (!user || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F766E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        {/* SIDEBAR */}
        <aside className="w-72 bg-[#0F172A] text-white hidden md:flex flex-col">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8" />
              <div>
                <h2 className="text-xl font-bold">A&O Admin</h2>
                <p className="text-sm text-slate-400">Panel Centralizado</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2 flex-1">
            <button
              onClick={() => setActiveSection('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'overview' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <DollarSign className="h-5 w-5" />
              Resumen General
            </button>
            <button
              onClick={() => setActiveSection('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'products' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package className="h-5 w-5" />
              Productos ANMA
            </button>
            <button
              onClick={() => setActiveSection('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'users' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="h-5 w-5" />
              Usuarios y Roles
            </button>
            <button
              onClick={() => setActiveSection('inverfact')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'inverfact' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingDown className="h-5 w-5" />
              Inverfact Estrategias
            </button>
            <button
              onClick={() => setActiveSection('inverpulse')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'inverpulse' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="h-5 w-5" />
              InverPulse
            </button>

            <div className="pt-4 border-t border-slate-700 mt-4">
              <p className="px-4 py-2 text-xs text-slate-500 uppercase tracking-wider">Accesos Rápidos</p>
              <Link to="/inverpulse/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
                <ChevronRight className="h-4 w-4" />
                Dashboard InverPulse
              </Link>
              <Link to="/inverfact/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
                <ChevronRight className="h-4 w-4" />
                Dashboard Inverfact
              </Link>
              <Link to="/nomadhive/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
                <ChevronRight className="h-4 w-4" />
                Dashboard NomadHive
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                <UserCog className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-slate-400">{user.role}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <header className="bg-white border-b border-slate-200 px-8 py-4">
            <h1 className="text-2xl font-bold text-[#0F172A]">
              {activeSection === 'overview' && 'Resumen General'}
              {activeSection === 'products' && 'Gestión de Productos'}
              {activeSection === 'users' && 'Usuarios y Roles'}
              {activeSection === 'inverfact' && 'Inverfact - Estrategias'}
              {activeSection === 'inverpulse' && 'InverPulse - Inversores'}
            </h1>
          </header>

          <div className="p-8">
            {/* OVERVIEW SECTION */}
            {activeSection === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white border border-slate-200 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Total Productos</span>
                      <Package className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="text-3xl font-bold text-[#0F172A]">{stats.total_products || 0}</div>
                  </div>
                  <div className="bg-white border border-slate-200 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Total Pedidos</span>
                      <ShoppingBag className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="text-3xl font-bold text-[#0F766E]">{stats.total_orders || 0}</div>
                  </div>
                  <div className="bg-white border border-slate-200 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Total Usuarios</span>
                      <Users className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="text-3xl font-bold text-[#0F172A]">{stats.total_users || 0}</div>
                  </div>
                  <div className="bg-white border border-slate-200 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Ingresos Totales</span>
                      <DollarSign className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="text-3xl font-bold text-[#F59E0B]">${stats.total_revenue?.toFixed(2) || '0.00'}</div>
                  </div>
                </div>

                {/* Platform Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-[#0F766E] to-[#0D9488] text-white p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Package className="h-8 w-8" />
                      <h3 className="text-xl font-bold">ANMA Soluciones</h3>
                    </div>
                    <p className="text-white/80 mb-4">E-commerce y catálogo de productos</p>
                    <div className="flex gap-2">
                      <Link to="/anma/tienda">
                        <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                          Ver Tienda
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="h-8 w-8" />
                      <h3 className="text-xl font-bold">InverPulse</h3>
                    </div>
                    <p className="text-white/80 mb-4">Broker propio - {inverpulseInvestors.length} inversores</p>
                    <div className="flex gap-2">
                      <Link to="/inverpulse/dashboard">
                        <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                          Ver Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingDown className="h-8 w-8" />
                      <h3 className="text-xl font-bold">Inverfact</h3>
                    </div>
                    <p className="text-white/80 mb-4">Educación financiera - {inverfactUsers.length} usuarios</p>
                    <div className="flex gap-2">
                      <Link to="/inverfact">
                        <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                          Ver Landing
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PRODUCTS SECTION */}
            {activeSection === 'products' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#0F172A]">Productos ANMA</h2>
                  <Button
                    data-testid="add-product-btn"
                    onClick={() => {
                      setEditingProduct(null);
                      setProductForm({ name: '', description: '', price: '', commission_rate: '', category: '', image_url: '', stock: 999 });
                      setShowProductModal(true);
                    }}
                    className="bg-[#0F766E] hover:bg-[#0D5F58] text-white rounded-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Producto
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Producto</th>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Categoría</th>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Precio</th>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Comisión</th>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Estado</th>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.product_id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium text-[#0F172A]">{product.name}</td>
                          <td className="py-3 px-4 text-slate-600">{product.category}</td>
                          <td className="py-3 px-4 font-semibold text-[#0F172A]">${product.price.toFixed(2)}</td>
                          <td className="py-3 px-4 text-slate-600">{product.commission_rate}%</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {product.status === 'active' ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDeleteProduct(product.product_id)}>
                                Desactivar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* USERS SECTION */}
            {activeSection === 'users' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-[#0F172A] mb-6">Usuarios del Sistema</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Nombre</th>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Rol Actual</th>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Cambiar Rol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.user_id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium text-[#0F172A]">{u.name}</td>
                          <td className="py-3 px-4 text-slate-600">{u.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              u.role === 'super_admin' ? 'bg-purple-100 text-purple-700' :
                              u.role === 'admin_marca' ? 'bg-blue-100 text-blue-700' :
                              u.role === 'impulsador' ? 'bg-green-100 text-green-700' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={u.role}
                              onChange={(e) => handleUpdateUserRole(u.user_id, e.target.value)}
                              className="border border-slate-200 rounded-lg px-3 py-1 text-sm"
                              disabled={u.user_id === user.user_id}
                            >
                              <option value="miembro">Miembro</option>
                              <option value="impulsador">Impulsador</option>
                              <option value="gerente">Gerente</option>
                              <option value="admin_marca">Admin Marca</option>
                              <option value="super_admin">Super Admin</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* INVERFACT SECTION */}
            {activeSection === 'inverfact' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-[#0F172A] mb-2">Gestión de Estrategias Inverfact</h2>
                <p className="text-slate-600 mb-6">Activa o desactiva estrategias de inversión para cada usuario</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Usuario</th>
                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Email</th>
                        {STRATEGIES.map(s => (
                          <th key={s.id} className="text-center py-3 px-4 text-slate-600 font-semibold text-sm">
                            {s.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {inverfactUsers.map(u => (
                        <tr key={u.user_id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium text-[#0F172A]">{u.name}</td>
                          <td className="py-3 px-4 text-slate-600 text-sm">{u.email}</td>
                          {STRATEGIES.map(strategy => {
                            const isActive = u.active_strategies?.some(s => s.strategy_id === strategy.id);
                            return (
                              <td key={strategy.id} className="py-3 px-4 text-center">
                                <button
                                  onClick={() => handleToggleStrategy(u.user_id, strategy.id, isActive)}
                                  className={`p-1 rounded-full transition-colors ${
                                    isActive 
                                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                  }`}
                                >
                                  {isActive ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* INVERPULSE SECTION */}
            {activeSection === 'inverpulse' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-[#0F172A]">Inversores InverPulse</h2>
                      <p className="text-slate-600">Total: {inverpulseInvestors.length} inversores registrados</p>
                    </div>
                    <Link to="/inverpulse/dashboard">
                      <Button className="bg-[#F59E0B] hover:bg-[#D97706]">
                        <Zap className="h-4 w-4 mr-2" />
                        Ir al Dashboard Completo
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-slate-200">
                        <tr>
                          <th className="text-left py-3 px-4 text-slate-600 font-semibold">Nombre</th>
                          <th className="text-left py-3 px-4 text-slate-600 font-semibold">Email</th>
                          <th className="text-left py-3 px-4 text-slate-600 font-semibold">Nivel</th>
                          <th className="text-left py-3 px-4 text-slate-600 font-semibold">Depósito Total</th>
                          <th className="text-left py-3 px-4 text-slate-600 font-semibold">KYC</th>
                          <th className="text-left py-3 px-4 text-slate-600 font-semibold">Referidos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inverpulseInvestors.map(inv => (
                          <tr key={inv.inversor_id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4 font-medium text-[#0F172A]">{inv.name}</td>
                            <td className="py-3 px-4 text-slate-600 text-sm">{inv.email}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                inv.level === 'RUBI' ? 'bg-red-100 text-red-700' :
                                inv.level === 'ZAFIRO' ? 'bg-blue-100 text-blue-700' :
                                inv.level === 'DIAMANTE' ? 'bg-purple-100 text-purple-700' :
                                inv.level === 'PLATINO' ? 'bg-slate-100 text-slate-700' :
                                inv.level === 'ORO' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {inv.level}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-[#0F766E]">${inv.total_deposit?.toFixed(2) || '0.00'}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                inv.kyc_status === 'approved' ? 'bg-green-100 text-green-700' :
                                inv.kyc_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
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
              </div>
            )}
          </div>
        </main>
      </div>

      {/* PRODUCT MODAL */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#0F172A]">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nombre del Producto</Label>
              <Input
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                placeholder="Ej: Crema Facial Premium"
              />
            </div>
            <div>
              <Label>Descripción</Label>
              <Input
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="Descripción del producto"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Precio (USD)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  placeholder="29.99"
                />
              </div>
              <div>
                <Label>Comisión (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={productForm.commission_rate}
                  onChange={(e) => setProductForm({ ...productForm, commission_rate: e.target.value })}
                  placeholder="15"
                />
              </div>
            </div>
            <div>
              <Label>Categoría</Label>
              <Input
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                placeholder="Ej: Bienestar, Hogar, Tecnología"
              />
            </div>
            <div>
              <Label>URL de Imagen</Label>
              <Input
                value={productForm.image_url}
                onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <Button
              data-testid="save-product-btn"
              onClick={handleSaveProduct}
              className="w-full bg-[#0F766E] hover:bg-[#0D5F58] text-white rounded-lg h-12"
            >
              {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminDashboard;
