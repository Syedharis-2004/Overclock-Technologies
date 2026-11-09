const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD
    ? 'https://overclock-technologies-pxf5.vercel.app/api'
    : 'http://localhost:5000/api'
);

// Clear legacy fake mock data keys from user's browser localStorage
const clearLegacyLocalData = () => {
  const legacyKeys = [
    'overclock_local_services',
    'overclock_local_careers',
    'overclock_local_team',
    'overclock_local_portfolio',
    'overclock_deleted_services_ids',
    'overclock_deleted_careers_ids',
    'overclock_deleted_team_ids',
    'overclock_deleted_portfolio_ids',
    'overclock_order_services',
    'overclock_order_careers',
    'overclock_order_team',
    'overclock_order_portfolio'
  ];
  legacyKeys.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (_) {}
  });
};
clearLegacyLocalData();

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

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.error || data.message || `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return data;
};

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email, password })
    });
    const data = await handleResponse(res);
    return data;
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders(true)
    });
    const data = await handleResponse(res);
    return data.data;
  },

  // Services
  async getServices() {
    const res = await fetch(`${API_BASE_URL}/services`);
    const data = await handleResponse(res);
    return data.data || [];
  },

  async createService(serviceData) {
    const res = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(serviceData)
    });
    const data = await handleResponse(res);
    return data.data;
  },

  async updateService(id, serviceData) {
    const res = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(serviceData)
    });
    const data = await handleResponse(res);
    return data.data;
  },

  async deleteService(id) {
    const res = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return await handleResponse(res);
  },

  // Careers
  async getCareers() {
    const res = await fetch(`${API_BASE_URL}/careers`);
    const data = await handleResponse(res);
    return data.data || [];
  },

  async createCareer(careerData) {
    const res = await fetch(`${API_BASE_URL}/careers`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(careerData)
    });
    const data = await handleResponse(res);
    return data.data;
  },

  async updateCareer(id, careerData) {
    const res = await fetch(`${API_BASE_URL}/careers/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(careerData)
    });
    const data = await handleResponse(res);
    return data.data;
  },

  async deleteCareer(id) {
    const res = await fetch(`${API_BASE_URL}/careers/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return await handleResponse(res);
  },

  // Leadership Team
  async getTeam() {
    const res = await fetch(`${API_BASE_URL}/team`);
    const data = await handleResponse(res);
    return data.data || [];
  },

  async createTeamMember(memberData) {
    const res = await fetch(`${API_BASE_URL}/team`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(memberData)
    });
    const data = await handleResponse(res);
    return data.data;
  },

  async updateTeamMember(id, memberData) {
    const res = await fetch(`${API_BASE_URL}/team/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(memberData)
    });
    const data = await handleResponse(res);
    return data.data;
  },

  async deleteTeamMember(id) {
    const res = await fetch(`${API_BASE_URL}/team/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return await handleResponse(res);
  },

  // Portfolio
  async getPortfolio() {
    const res = await fetch(`${API_BASE_URL}/portfolio`);
    const data = await handleResponse(res);
    return data.data || [];
  },

  async createPortfolio(projectData) {
    const res = await fetch(`${API_BASE_URL}/portfolio`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(projectData)
    });
    const data = await handleResponse(res);
    return data.data;
  },

  async updatePortfolio(id, projectData) {
    const res = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(projectData)
    });
    const data = await handleResponse(res);
    return data.data;
  },

  async deletePortfolio(id) {
    const res = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    return await handleResponse(res);
  },

  // Reorder items
  async reorder(type, orderedItems) {
    if (!Array.isArray(orderedItems)) return orderedItems;
    const orderedIds = orderedItems.map(item => item._id);

    const res = await fetch(`${API_BASE_URL}/${type}/reorder`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ orderedIds })
    });
    const data = await handleResponse(res);
    return data.data || orderedItems;
  }
};
