import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, LogOut, Plus, Edit2, Trash2, Check, AlertCircle, Briefcase, 
  Layers, Users, FolderGit2, X, RefreshCw, Eye, Sparkles,
  Upload, ImageIcon, Link
} from 'lucide-react';
import { api } from '../services/api';

const Admin = () => {
  // Auth state
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active Tab: 'careers' | 'services' | 'team' | 'portfolio'
  const [activeTab, setActiveTab] = useState('careers');

  const getTabLabel = (tabKey) => {
    switch (tabKey) {
      case 'careers': return 'Career Listing';
      case 'services': return 'Service';
      case 'team': return 'Team Member';
      case 'portfolio': return 'Portfolio Project';
      default: return 'Item';
    }
  };

  // Data states
  const [careers, setCareers] = useState([]);
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Notification Toast
  const [toast, setToast] = useState(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [currentItem, setCurrentItem] = useState(null);

  // Form states
  const [formData, setFormData] = useState({});

  // Image upload state
  const [imagePreview, setImagePreview] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Convert file to Base64
  const handleImageFileChange = (file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image size 2MB se zyada nahi honi chahiye', 'error');
      return;
    }
    setImageUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImagePreview(base64);
      setFormData(prev => ({ ...prev, imageUrl: base64 }));
      setImageUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Check login state
  useEffect(() => {
    if (token) {
      loadAllData();
    }
  }, [token]);

  const loadAllData = async () => {
    setLoadingData(true);
    try {
      const [cRes, sRes, tRes, pRes] = await Promise.allSettled([
        api.getCareers(),
        api.getServices(),
        api.getTeam(),
        api.getPortfolio()
      ]);

      if (cRes.status === 'fulfilled') setCareers(cRes.value || []);
      if (sRes.status === 'fulfilled') setServices(sRes.value || []);
      if (tRes.status === 'fulfilled') setTeam(tRes.value || []);
      if (pRes.status === 'fulfilled') setPortfolio(pRes.value || []);
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('Could not reach backend database. Using local state.', 'error');
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    if (email !== 'admin@overclock.com' || password !== 'Ot@54321') {
      setAuthError('Invalid credentials');
      setAuthLoading(false);
      return;
    }

    try {
      const res = await api.login(email, password);
      if (res && res.token) {
        localStorage.setItem('adminToken', res.token);
        setToken(res.token);
        showToast('Successfully logged in as Admin');
        setAuthLoading(false);
        return;
      }
    } catch (err) {
      // Fallback for standalone/mocked session when backend DB is disconnected or offline
      if (email === 'admin@overclock.com' && password === 'Ot@54321') {
        const dummyToken = 'admin-session-token-overclock';
        localStorage.setItem('adminToken', dummyToken);
        setToken(dummyToken);
        showToast('Successfully logged in as Admin');
        setAuthLoading(false);
        return;
      }
      setAuthError(err.message || 'Login failed. Invalid credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    showToast('Logged out of Admin Panel', 'info');
  };

  // Open modal for adding/editing
  const openModal = (type, item = null) => {
    setModalType(type);
    setCurrentItem(item);
    // Reset image preview
    setImagePreview('');
    if (type === 'edit' && item) {
      setFormData({
        ...item,
        requirements: Array.isArray(item.requirements) ? item.requirements.join(', ') : item.requirements || '',
        features: Array.isArray(item.features) ? item.features.join(', ') : item.features || '',
        benefits: Array.isArray(item.benefits) ? item.benefits.join(', ') : item.benefits || '',
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies || ''
      });
      // If editing and member already has image, show it as preview
      if (item.imageUrl) setImagePreview(item.imageUrl);
    } else {
      // Default empty forms per tab
      if (activeTab === 'careers') {
        setFormData({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-time', description: '', requirements: '', isActive: true });
      } else if (activeTab === 'services') {
        setFormData({ title: '', description: '', icon: 'Code', features: '', benefits: '' });
      } else if (activeTab === 'team') {
        setFormData({ name: '', role: '', bio: '', imageUrl: '', linkedin: '', twitter: '', order: 0 });
      } else if (activeTab === 'portfolio') {
        setFormData({ title: '', category: 'Web Development', description: '', technologies: '', imageUrl: '', liveDemoUrl: '', githubUrl: '' });
      }
    }
    setModalOpen(true);
  };

  // Submit modal form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'careers') {
        const payload = {
          ...formData,
          requirements: typeof formData.requirements === 'string'
            ? formData.requirements.split(',').map(s => s.trim()).filter(Boolean)
            : formData.requirements
        };
        if (modalType === 'add') {
          try {
            const newItem = await api.createCareer(payload);
            setCareers([newItem, ...careers]);
          } catch {
            const fallbackItem = { ...payload, _id: Date.now().toString() };
            setCareers([fallbackItem, ...careers]);
          }
          showToast('Career opening added');
        } else {
          try {
            const updated = await api.updateCareer(currentItem._id, payload);
            setCareers(careers.map(c => c._id === currentItem._id ? updated : c));
          } catch {
            setCareers(careers.map(c => c._id === currentItem._id ? { ...c, ...payload } : c));
          }
          showToast('Career opening updated');
        }
      } else if (activeTab === 'services') {
        const payload = {
          ...formData,
          features: typeof formData.features === 'string' ? formData.features.split(',').map(s => s.trim()).filter(Boolean) : formData.features,
          benefits: typeof formData.benefits === 'string' ? formData.benefits.split(',').map(s => s.trim()).filter(Boolean) : formData.benefits
        };
        if (modalType === 'add') {
          try {
            const newItem = await api.createService(payload);
            setServices([newItem, ...services]);
          } catch {
            const fallbackItem = { ...payload, _id: Date.now().toString() };
            setServices([fallbackItem, ...services]);
          }
          showToast('Service added');
        } else {
          try {
            const updated = await api.updateService(currentItem._id, payload);
            setServices(services.map(s => s._id === currentItem._id ? updated : s));
          } catch {
            setServices(services.map(s => s._id === currentItem._id ? { ...s, ...payload } : s));
          }
          showToast('Service updated');
        }
      } else if (activeTab === 'team') {
        const payload = { ...formData, order: Number(formData.order) || 0 };
        if (modalType === 'add') {
          try {
            const newItem = await api.createTeamMember(payload);
            setTeam([...team, newItem]);
          } catch {
            const fallbackItem = { ...payload, _id: Date.now().toString() };
            setTeam([...team, fallbackItem]);
          }
          showToast('Team member added');
        } else {
          try {
            const updated = await api.updateTeamMember(currentItem._id, payload);
            setTeam(team.map(t => t._id === currentItem._id ? updated : t));
          } catch {
            setTeam(team.map(t => t._id === currentItem._id ? { ...t, ...payload } : t));
          }
          showToast('Team member updated');
        }
      } else if (activeTab === 'portfolio') {
        const payload = {
          ...formData,
          technologies: typeof formData.technologies === 'string' ? formData.technologies.split(',').map(s => s.trim()).filter(Boolean) : formData.technologies
        };
        if (modalType === 'add') {
          try {
            const newItem = await api.createPortfolio(payload);
            setPortfolio([newItem, ...portfolio]);
          } catch {
            const fallbackItem = { ...payload, _id: Date.now().toString() };
            setPortfolio([fallbackItem, ...portfolio]);
          }
          showToast('Portfolio project added');
        } else {
          try {
            const updated = await api.updatePortfolio(currentItem._id, payload);
            setPortfolio(portfolio.map(p => p._id === currentItem._id ? updated : p));
          } catch {
            setPortfolio(portfolio.map(p => p._id === currentItem._id ? { ...p, ...payload } : p));
          }
          showToast('Portfolio project updated');
        }
      }
      setModalOpen(false);
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      if (activeTab === 'careers') {
        await api.deleteCareer(id);
        setCareers(prev => prev.filter(c => c._id !== id));
        showToast('Career listing deleted');
      } else if (activeTab === 'services') {
        await api.deleteService(id);
        setServices(prev => prev.filter(s => s._id !== id));
        showToast('Service deleted');
      } else if (activeTab === 'team') {
        await api.deleteTeamMember(id);
        setTeam(prev => prev.filter(t => t._id !== id));
        showToast('Team member deleted');
      } else if (activeTab === 'portfolio') {
        await api.deletePortfolio(id);
        setPortfolio(prev => prev.filter(p => p._id !== id));
        showToast('Portfolio item deleted');
      }
    } catch (err) {
      console.error('Delete error:', err);
      // Fallback state filter if network glitch
      if (activeTab === 'careers') setCareers(prev => prev.filter(c => c._id !== id));
      if (activeTab === 'services') setServices(prev => prev.filter(s => s._id !== id));
      if (activeTab === 'team') setTeam(prev => prev.filter(t => t._id !== id));
      if (activeTab === 'portfolio') setPortfolio(prev => prev.filter(p => p._id !== id));
      showToast(err.message || 'Item deleted', 'info');
    }
  };

  // Render Login view if not authenticated
  if (!token) {
    return (
      <div className="bg-[#022b3a] min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="max-w-md w-full bg-[#0e3a4b] border border-primary/40 p-8 shadow-[0_0_50px_rgba(31,122,140,0.3)] relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-primary/10 border border-primary text-primary mb-4">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Overclock Technologies Control Panel</p>
          </div>

          {authError && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle size={16} /> {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@overclock.com"
                className="w-full bg-[#022b3a] border border-slate-700 focus:border-primary p-3 text-white text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#022b3a] border border-slate-700 focus:border-primary p-3 text-white text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-primary text-[#022b3a] font-bold uppercase tracking-wider text-xs hover:bg-white transition-all shadow-[0_0_15px_rgba(31,122,140,0.4)] disabled:opacity-50"
            >
              {authLoading ? 'Authenticating...' : 'Sign In To Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#022b3a] min-h-screen text-slate-200 pt-8 pb-24 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3 border shadow-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 ${
              toast.type === 'error' 
                ? 'bg-red-950 border-red-500 text-red-300' 
                : 'bg-[#0e3a4b] border-primary text-white shadow-[0_0_20px_rgba(31,122,140,0.4)]'
            }`}
          >
            <Check size={18} className="text-primary" />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#0e3a4b]">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-primary/20 border border-primary text-primary text-xs font-bold px-3 py-1 uppercase tracking-widest">
                Admin Console
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Sparkles size={14} className="text-primary" /> Content Management System
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mt-2 uppercase tracking-wider">
              Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              className="p-2.5 bg-[#0e3a4b] hover:bg-[#0e3a4b]/80 text-slate-300 hover:text-primary border border-primary/30 transition-all"
              title="Refresh Data"
            >
              <RefreshCw size={18} className={loadingData ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { id: 'careers', name: 'Careers', icon: Briefcase, count: careers.length },
            { id: 'services', name: 'Services', icon: Layers, count: services.length },
            { id: 'team', name: 'Leadership Team', icon: Users, count: team.length },
            { id: 'portfolio', name: 'Portfolio', icon: FolderGit2, count: portfolio.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 border text-left transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? 'bg-[#0e3a4b] border-primary text-white shadow-[0_0_20px_rgba(31,122,140,0.4)]'
                    : 'bg-[#022b3a] border-[#0e3a4b] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={22} className={isActive ? 'text-primary' : 'text-slate-500 group-hover:text-primary transition-colors'} />
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${isActive ? 'bg-primary text-[#022b3a]' : 'bg-[#0e3a4b] text-slate-400'}`}>
                    {tab.count}
                  </span>
                </div>
                <div className="text-sm font-bold uppercase tracking-wider">{tab.name}</div>
              </button>
            );
          })}
        </div>

        {/* Action Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            Manage {activeTab.toUpperCase()}
          </h2>

          <button
            onClick={() => openModal('add')}
            className="px-5 py-2.5 bg-primary text-[#022b3a] font-bold uppercase tracking-wider text-xs hover:bg-white transition-all shadow-[0_0_15px_rgba(31,122,140,0.4)] flex items-center gap-2"
          >
            <Plus size={18} /> Add New {getTabLabel(activeTab)}
          </button>
        </div>

        {/* TAB 1: CAREERS TABLE / LIST */}
        {activeTab === 'careers' && (
          <div className="bg-[#0b2f3f]/50 border border-primary/20 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0b2f3f] text-slate-300 uppercase tracking-widest border-b border-primary/20">
                  <th className="p-4">Title</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {careers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500 uppercase tracking-wider">
                      No career listings found. Click "Add New Career Listing" above.
                    </td>
                  </tr>
                ) : (
                  careers.map((job) => (
                    <tr key={job._id} className="hover:bg-[#0b2f3f]/80 transition-colors">
                      <td className="p-4 font-bold text-white">{job.title}</td>
                      <td className="p-4 text-slate-300">{job.department}</td>
                      <td className="p-4 text-slate-400">{job.location}</td>
                      <td className="p-4 text-primary font-semibold">{job.type}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${job.isActive !== false ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}>
                          {job.isActive !== false ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openModal('edit', job)}
                            className="p-2 bg-[#0b1a20] text-slate-300 hover:text-primary border border-slate-700"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="p-2 bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: SERVICES TABLE / LIST */}
        {activeTab === 'services' && (
          <div className="bg-[#0b2f3f]/50 border border-primary/20 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0b2f3f] text-slate-300 uppercase tracking-widest border-b border-primary/20">
                  <th className="p-4">Icon</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {services.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-500 uppercase tracking-wider">
                      No services found. Click "Add New Service" above.
                    </td>
                  </tr>
                ) : (
                  services.map((srv) => (
                    <tr key={srv._id} className="hover:bg-[#0b2f3f]/80 transition-colors">
                      <td className="p-4 font-bold text-primary">{srv.icon || 'Code'}</td>
                      <td className="p-4 font-bold text-white">{srv.title}</td>
                      <td className="p-4 text-slate-400 max-w-md truncate">{srv.description || srv.desc}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openModal('edit', srv)}
                            className="p-2 bg-[#0b1a20] text-slate-300 hover:text-primary border border-slate-700"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(srv._id)}
                            className="p-2 bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: LEADERSHIP TEAM LIST */}
        {activeTab === 'team' && (
          <div className="bg-[#0b2f3f]/50 border border-primary/20 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0b2f3f] text-slate-300 uppercase tracking-widest border-b border-primary/20">
                  <th className="p-4">Photo</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Role / Designation</th>
                  <th className="p-4">Bio</th>
                  <th className="p-4">Social Links</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {team.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500 uppercase tracking-wider">
                      No team members found. Click "Add New Team Member" above.
                    </td>
                  </tr>
                ) : (
                  team.map((mbr) => (
                    <tr key={mbr._id} className="hover:bg-[#0b2f3f]/80 transition-colors">
                      <td className="p-4">
                        {mbr.imageUrl ? (
                          <img
                            src={mbr.imageUrl}
                            alt={mbr.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary/40"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#0b1a20] border-2 border-slate-700 flex items-center justify-center">
                            <ImageIcon size={16} className="text-slate-500" />
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-bold text-white">{mbr.name}</td>
                      <td className="p-4 text-primary font-semibold">{mbr.role}</td>
                      <td className="p-4 text-slate-400 max-w-xs truncate">{mbr.bio || 'N/A'}</td>
                      <td className="p-4 text-slate-400">
                        {mbr.linkedin ? 'LinkedIn ' : ''}
                        {mbr.twitter ? 'Twitter' : ''}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openModal('edit', mbr)}
                            className="p-2 bg-[#0b1a20] text-slate-300 hover:text-primary border border-slate-700"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(mbr._id)}
                            className="p-2 bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: PORTFOLIO LIST */}
        {activeTab === 'portfolio' && (
          <div className="bg-[#0b2f3f]/50 border border-primary/20 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0b2f3f] text-slate-300 uppercase tracking-widest border-b border-primary/20">
                  <th className="p-4">Project Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Technologies</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {portfolio.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-500 uppercase tracking-wider">
                      No portfolio projects found. Click "Add New Portfolio Project" above.
                    </td>
                  </tr>
                ) : (
                  portfolio.map((prj) => (
                    <tr key={prj._id} className="hover:bg-[#0b2f3f]/80 transition-colors">
                      <td className="p-4 font-bold text-white">{prj.title}</td>
                      <td className="p-4 text-primary font-semibold">{prj.category}</td>
                      <td className="p-4 text-slate-400">
                        {Array.isArray(prj.technologies) ? prj.technologies.join(', ') : prj.technologies}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openModal('edit', prj)}
                            className="p-2 bg-[#0b1a20] text-slate-300 hover:text-primary border border-slate-700"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(prj._id)}
                            className="p-2 bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FORM MODAL FOR ADD/EDIT */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b2f3f] border border-primary/40 p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(0,157,177,0.3)]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-6">
              {modalType === 'add' ? `Add ${getTabLabel(activeTab)}` : `Edit ${getTabLabel(activeTab)}`}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {/* CAREERS FORM */}
              {activeTab === 'careers' && (
                <>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Job Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase font-bold text-slate-300 mb-1">Department</label>
                      <input
                        type="text"
                        required
                        value={formData.department || ''}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-bold text-slate-300 mb-1">Type</label>
                      <select
                        value={formData.type || 'Full-time'}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Remote, Silicon Valley, On-site"
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Job Description</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Requirements (comma-separated)</label>
                    <textarea
                      rows={3}
                      value={formData.requirements || ''}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="React, TypeScript, AWS"
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive !== false}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="accent-primary w-4 h-4"
                    />
                    <label htmlFor="isActive" className="uppercase font-bold text-slate-300">Active Listing</label>
                  </div>
                </>
              )}

              {/* SERVICES FORM */}
              {activeTab === 'services' && (
                <>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Service Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Icon Name</label>
                    <select
                      value={formData.icon || 'Code'}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    >
                      <option value="Code">Code (Web Dev)</option>
                      <option value="PenTool">PenTool (Graphic Design)</option>
                      <option value="BrainCircuit">BrainCircuit (AI & Data)</option>
                      <option value="LineChart">LineChart (Consultation)</option>
                      <option value="Smartphone">Smartphone (Mobile Apps)</option>
                      <option value="Cloud">Cloud (DevOps)</option>
                      <option value="Shield">Shield (Cybersecurity)</option>
                      <option value="Database">Database (DB Management)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                </>
              )}

              {/* LEADERSHIP TEAM FORM */}
              {activeTab === 'team' && (
                <>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Role / Designation</label>
                    <input
                      type="text"
                      required
                      value={formData.role || ''}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. CEO & Founder"
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Bio</label>
                    <textarea
                      rows={3}
                      value={formData.bio || ''}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  {/* ── IMAGE UPLOAD WIDGET ── */}
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-2">Profile Photo</label>

                    {/* Drop zone / click to upload */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith('image/')) handleImageFileChange(file);
                      }}
                      className="relative w-full border-2 border-dashed border-primary/40 hover:border-primary bg-[#0b1a20] transition-colors cursor-pointer rounded-sm overflow-hidden"
                      style={{ minHeight: '120px' }}
                    >
                      {imagePreview ? (
                        <div className="flex items-center gap-4 p-3">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-full border-2 border-primary flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">Image Ready ✓</p>
                            <p className="text-slate-400 text-[10px] truncate">
                              {formData.imageUrl?.startsWith('data:') ? 'Uploaded from device' : formData.imageUrl}
                            </p>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setImagePreview(''); setFormData(prev => ({ ...prev, imageUrl: '' })); }}
                              className="mt-2 text-[10px] text-red-400 hover:text-red-300 uppercase tracking-wider font-bold"
                            >
                              × Remove Image
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 gap-2">
                          {imageUploading ? (
                            <>
                              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                              <p className="text-primary text-xs uppercase tracking-wider">Processing...</p>
                            </>
                          ) : (
                            <>
                              <Upload size={28} className="text-primary/60" />
                              <p className="text-slate-300 font-bold text-xs uppercase tracking-wider">Click or Drag & Drop</p>
                              <p className="text-slate-500 text-[10px]">JPG, PNG, WEBP — Max 2MB</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileChange(e.target.files[0])}
                    />

                    {/* OR paste URL fallback */}
                    <div className="mt-3 flex items-center gap-2">
                      <Link size={12} className="text-slate-500 flex-shrink-0" />
                      <input
                        type="url"
                        value={formData.imageUrl?.startsWith('data:') ? '' : (formData.imageUrl || '')}
                        onChange={(e) => {
                          setFormData({ ...formData, imageUrl: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        placeholder="Ya seedha image URL paste karein..."
                        className="flex-1 bg-[#0b1a20] border border-slate-700 focus:border-primary px-3 py-2 text-white outline-none text-[10px]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase font-bold text-slate-300 mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        value={formData.linkedin || ''}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-bold text-slate-300 mb-1">Twitter URL</label>
                      <input
                        type="url"
                        value={formData.twitter || ''}
                        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                        className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* PORTFOLIO FORM */}
              {activeTab === 'portfolio' && (
                <>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      required
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Web Development, Mobile App, AI, etc."
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.technologies || ''}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      placeholder="React, Node.js, AWS"
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-bold text-slate-300 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://example.com/screenshot.jpg"
                      className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase font-bold text-slate-300 mb-1">Live Demo URL</label>
                      <input
                        type="url"
                        value={formData.liveDemoUrl || ''}
                        onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                        className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-bold text-slate-300 mb-1">GitHub URL</label>
                      <input
                        type="url"
                        value={formData.githubUrl || ''}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        className="w-full bg-[#0b1a20] border border-slate-700 focus:border-primary p-3 text-white outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-600 text-slate-300 hover:text-white uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-[#0b1a20] font-bold uppercase hover:bg-white transition-all shadow-[0_0_15px_rgba(0,157,177,0.3)]"
                >
                  {modalType === 'add' ? 'Save New Item' : 'Update Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
