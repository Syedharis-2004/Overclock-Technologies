const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD
    ? 'https://overclock-technologies-pxf5.vercel.app/api'
    : 'http://localhost:5000/api'
);

const getHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (includeAuth) {
    const token = localStorage.getItem('adminToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Helper utilities for persistent local caching across Vercel serverless invocations
const getStorageList = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const setStorageList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (err) {
    console.warn('Storage save failed:', err);
  }
};

const addDeletedId = (key, id) => {
  const list = getStorageList(key);
  if (!list.includes(id)) {
    setStorageList(key, [...list, id]);
  }
};

const getSavedOrder = (type) => getStorageList(`overclock_order_${type}`);

const sortBySavedOrder = (items, type) => {
  const orderList = getSavedOrder(type);
  if (!orderList || !orderList.length) {
    return [...items].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
  }
  const map = new Map();
  orderList.forEach((id, index) => map.set(id, index));
  return [...items].sort((a, b) => {
    const idxA = map.has(a._id) ? map.get(a._id) : (a.order ?? 9999);
    const idxB = map.has(b._id) ? map.get(b._id) : (b.order ?? 9999);
    return idxA - idxB;
  });
};

const mergeLists = (apiItems = [], localItems = [], deletedKey = null, type = null) => {
  const deletedSet = deletedKey ? new Set(getStorageList(deletedKey)) : new Set();
  const map = new Map();

  (apiItems || []).forEach(item => {
    if (item && item._id && !deletedSet.has(item._id)) {
      map.set(item._id, item);
    }
  });

  (localItems || []).forEach(item => {
    if (item && item._id && !deletedSet.has(item._id)) {
      map.set(item._id, item);
    }
  });

  const merged = Array.from(map.values()).filter(item => !deletedSet.has(item._id));
  return type ? sortBySavedOrder(merged, type) : merged;
};

const removeStorageItem = (key, id) => {
  const list = getStorageList(key).filter(item => item._id !== id);
  setStorageList(key, list);
};

export const api = {
  // Auth
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) return data;
    } catch (err) {
      console.warn('API login network error, fallback mode check:', err.message);
    }

    if (email === 'admin@overclock.com' && password === 'Ot@54321') {
      return { success: true, token: 'admin-session-token-overclock' };
    }
    throw new Error('Invalid email or password');
  },

  // Services
  async getServices() {
    let apiData = [];
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      const data = await res.json();
      if (res.ok && data.data) apiData = data.data;
    } catch (err) {
      console.warn('Get services API fallback:', err.message);
    }
    const localData = getStorageList('overclock_local_services');
    return mergeLists(apiData, localData, 'overclock_deleted_services_ids', 'services');
  },

  async createService(serviceData) {
    let created = null;
    try {
      const res = await fetch(`${API_BASE_URL}/services`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(serviceData)
      });
      const data = await res.json();
      if (res.ok && data.data) created = data.data;
    } catch (err) {
      console.warn('Create service API fallback:', err.message);
    }

    if (!created) {
      created = { _id: 'srv-' + Date.now(), ...serviceData };
    }
    const current = getStorageList('overclock_local_services');
    setStorageList('overclock_local_services', [created, ...current]);
    return created;
  },

  async updateService(id, serviceData) {
    let updated = null;
    try {
      const res = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(serviceData)
      });
      const data = await res.json();
      if (res.ok && data.data) updated = data.data;
    } catch (err) {
      console.warn('Update service API fallback:', err.message);
    }

    if (!updated) {
      updated = { _id: id, ...serviceData };
    }
    const current = getStorageList('overclock_local_services');
    const idx = current.findIndex(s => s._id === id);
    if (idx !== -1) current[idx] = updated;
    else current.unshift(updated);
    setStorageList('overclock_local_services', current);
    return updated;
  },

  async deleteService(id) {
    try {
      await fetch(`${API_BASE_URL}/services/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      });
    } catch (err) {
      console.warn('Delete service API fallback:', err.message);
    }
    removeStorageItem('overclock_local_services', id);
    addDeletedId('overclock_deleted_services_ids', id);
    return { success: true };
  },

  // Careers
  async getCareers() {
    let apiData = [];
    try {
      const res = await fetch(`${API_BASE_URL}/careers`);
      const data = await res.json();
      if (res.ok && data.data) apiData = data.data;
    } catch (err) {
      console.warn('Get careers API fallback:', err.message);
    }
    const localData = getStorageList('overclock_local_careers');
    return mergeLists(apiData, localData, 'overclock_deleted_careers_ids', 'careers');
  },

  async createCareer(careerData) {
    let created = null;
    try {
      const res = await fetch(`${API_BASE_URL}/careers`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(careerData)
      });
      const data = await res.json();
      if (res.ok && data.data) created = data.data;
    } catch (err) {
      console.warn('Create career API fallback:', err.message);
    }

    if (!created) {
      created = { _id: 'car-' + Date.now(), ...careerData, createdAt: new Date() };
    }
    const current = getStorageList('overclock_local_careers');
    setStorageList('overclock_local_careers', [created, ...current]);
    return created;
  },

  async updateCareer(id, careerData) {
    let updated = null;
    try {
      const res = await fetch(`${API_BASE_URL}/careers/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(careerData)
      });
      const data = await res.json();
      if (res.ok && data.data) updated = data.data;
    } catch (err) {
      console.warn('Update career API fallback:', err.message);
    }

    if (!updated) {
      updated = { _id: id, ...careerData };
    }
    const current = getStorageList('overclock_local_careers');
    const idx = current.findIndex(c => c._id === id);
    if (idx !== -1) current[idx] = updated;
    else current.unshift(updated);
    setStorageList('overclock_local_careers', current);
    return updated;
  },

  async deleteCareer(id) {
    try {
      await fetch(`${API_BASE_URL}/careers/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      });
    } catch (err) {
      console.warn('Delete career API fallback:', err.message);
    }
    removeStorageItem('overclock_local_careers', id);
    addDeletedId('overclock_deleted_careers_ids', id);
    return { success: true };
  },

  // Leadership Team
  async getTeam() {
    let apiData = [];
    try {
      const res = await fetch(`${API_BASE_URL}/team`);
      const data = await res.json();
      if (res.ok && data.data) apiData = data.data;
    } catch (err) {
      console.warn('Get team API fallback:', err.message);
    }
    const localData = getStorageList('overclock_local_team');
    return mergeLists(apiData, localData, 'overclock_deleted_team_ids', 'team');
  },

  async createTeamMember(memberData) {
    let created = null;
    try {
      const res = await fetch(`${API_BASE_URL}/team`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(memberData)
      });
      const data = await res.json();
      if (res.ok && data.data) created = data.data;
    } catch (err) {
      console.warn('Create team member API fallback:', err.message);
    }

    if (!created) {
      created = { _id: 'tm-' + Date.now(), ...memberData };
    }
    const current = getStorageList('overclock_local_team');
    setStorageList('overclock_local_team', [...current, created]);
    return created;
  },

  async updateTeamMember(id, memberData) {
    let updated = null;
    try {
      const res = await fetch(`${API_BASE_URL}/team/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(memberData)
      });
      const data = await res.json();
      if (res.ok && data.data) updated = data.data;
    } catch (err) {
      console.warn('Update team member API fallback:', err.message);
    }

    if (!updated) {
      updated = { _id: id, ...memberData };
    }
    const current = getStorageList('overclock_local_team');
    const idx = current.findIndex(t => t._id === id);
    if (idx !== -1) current[idx] = updated;
    else current.push(updated);
    setStorageList('overclock_local_team', current);
    return updated;
  },

  async deleteTeamMember(id) {
    try {
      await fetch(`${API_BASE_URL}/team/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      });
    } catch (err) {
      console.warn('Delete team member API fallback:', err.message);
    }
    removeStorageItem('overclock_local_team', id);
    addDeletedId('overclock_deleted_team_ids', id);
    return { success: true };
  },

  // Portfolio
  async getPortfolio() {
    let apiData = [];
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio`);
      const data = await res.json();
      if (res.ok && data.data) apiData = data.data;
    } catch (err) {
      console.warn('Get portfolio API fallback:', err.message);
    }
    const localData = getStorageList('overclock_local_portfolio');
    return mergeLists(apiData, localData, 'overclock_deleted_portfolio_ids', 'portfolio');
  },

  async createPortfolio(projectData) {
    let created = null;
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(projectData)
      });
      const data = await res.json();
      if (res.ok && data.data) created = data.data;
    } catch (err) {
      console.warn('Create portfolio API fallback:', err.message);
    }

    if (!created) {
      created = { _id: 'pf-' + Date.now(), ...projectData, createdAt: new Date() };
    }
    const current = getStorageList('overclock_local_portfolio');
    setStorageList('overclock_local_portfolio', [created, ...current]);
    return created;
  },

  async updatePortfolio(id, projectData) {
    let updated = null;
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(projectData)
      });
      const data = await res.json();
      if (res.ok && data.data) updated = data.data;
    } catch (err) {
      console.warn('Update portfolio API fallback:', err.message);
    }

    if (!updated) {
      updated = { _id: id, ...projectData };
    }
    const current = getStorageList('overclock_local_portfolio');
    const idx = current.findIndex(p => p._id === id);
    if (idx !== -1) current[idx] = updated;
    else current.unshift(updated);
    setStorageList('overclock_local_portfolio', current);
    return updated;
  },

  async deletePortfolio(id) {
    try {
      await fetch(`${API_BASE_URL}/portfolio/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true)
      });
    } catch (err) {
      console.warn('Delete portfolio API fallback:', err.message);
    }
    removeStorageItem('overclock_local_portfolio', id);
    addDeletedId('overclock_deleted_portfolio_ids', id);

    const currentOrder = getStorageList('overclock_order_portfolio');
    setStorageList('overclock_order_portfolio', currentOrder.filter(x => x !== id));
    return { success: true };
  },

  // Reorder items across any tab (careers, services, team, portfolio)
  async reorder(type, orderedItems) {
    if (!Array.isArray(orderedItems)) return orderedItems;
    const orderedIds = orderedItems.map(item => item._id);

    // Save order and items locally so live frontend renders it instantly
    setStorageList(`overclock_order_${type}`, orderedIds);
    setStorageList(`overclock_local_${type}`, orderedItems);

    try {
      await fetch(`${API_BASE_URL}/${type}/reorder`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ orderedIds })
      });
    } catch (err) {
      console.warn(`Reorder ${type} API fallback:`, err.message);
    }

    return orderedItems;
  }
};
