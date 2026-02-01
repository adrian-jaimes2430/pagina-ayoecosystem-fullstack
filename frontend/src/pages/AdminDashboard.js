import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, Package, ShoppingBag, DollarSign, LogOut, Plus, Edit } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    commission_rate: '',
    category: '',
    image_url: '',
    stock: 999
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
    } catch (error) {
      toast.error('Error al cargar datos administrativos');
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
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-[#0F172A]">Admin Panel</h2>
          </div>
          <nav className="p-4 space-y-2">
            <a href="#estadisticas" className="flex items-center gap-3 px-4 py-3 text-slate-700 bg-slate-100 rounded-lg font-medium">
              <DollarSign className="h-5 w-5" />
              Estadísticas
            </a>
            <a href="#productos" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Package className="h-5 w-5" />
              Productos
            </a>
            <a href="#usuarios" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Users className="h-5 w-5" />
              Usuarios
            </a>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <ShoppingBag className="h-5 w-5" />
              Mi Dashboard
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">Panel Administrativo</h1>
              <p className="text-sm text-slate-600">{user.name} - {user.role}</p>
            </div>
            <Button data-testid="admin-logout-btn" onClick={handleLogout} variant="outline" className="rounded-lg">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </header>

          <div className="p-8">
            {/* STATS */}
            <div id="estadisticas" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Total Productos</span>
                  <Package className="h-5 w-5 text-slate-400" />
                </div>
                <div className="text-3xl font-bold text-[#0F172A]" style={{fontFamily: 'Space Grotesk, monospace'}}>
                  {stats.total_products || 0}
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Total Pedidos</span>
                  <ShoppingBag className="h-5 w-5 text-slate-400" />
                </div>
                <div className="text-3xl font-bold text-[#0F766E]" style={{fontFamily: 'Space Grotesk, monospace'}}>
                  {stats.total_orders || 0}
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Total Usuarios</span>
                  <Users className="h-5 w-5 text-slate-400" />
                </div>
                <div className="text-3xl font-bold text-[#0F172A]" style={{fontFamily: 'Space Grotesk, monospace'}}>
                  {stats.total_users || 0}
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Ingresos Totales</span>
                  <DollarSign className="h-5 w-5 text-slate-400" />
                </div>
                <div className="text-3xl font-bold text-[#F59E0B]" style={{fontFamily: 'Space Grotesk, monospace'}}>
                  ${stats.total_revenue?.toFixed(2) || '0.00'}
                </div>
              </div>
            </div>

            {/* PRODUCTS */}
            <div id="productos" className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0F172A]">Productos</h2>
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

            {/* USERS */}
            <div id="usuarios" className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">Usuarios</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-slate-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-slate-600 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-4 text-slate-600 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-slate-600 font-semibold">Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.user_id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium text-[#0F172A]">{u.name}</td>
                        <td className="py-3 px-4 text-slate-600">{u.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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