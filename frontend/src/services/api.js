const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  // Services
  async getServices() {
    const res = await fetch(`${API_BASE_URL}/services`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch services');
    return data.data;
  },
  async createService(serviceData) {
    const res = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(serviceData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create service');
    return data.data;
  },
  async updateService(id, serviceData) {
    const res = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(serviceData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update service');
    return data.data;
  },
  async deleteService(id) {
    const res = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete service');
    return data;
  },

  // Careers
  async getCareers() {
    const res = await fetch(`${API_BASE_URL}/careers`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch careers');
    return data.data;
  },
  async createCareer(careerData) {
    const res = await fetch(`${API_BASE_URL}/careers`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(careerData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create career listing');
    return data.data;
  },
  async updateCareer(id, careerData) {
    const res = await fetch(`${API_BASE_URL}/careers/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(careerData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update career listing');
    return data.data;
  },
  async deleteCareer(id) {
    const res = await fetch(`${API_BASE_URL}/careers/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete career listing');
    return data;
  },

  // Leadership Team
  async getTeam() {
    const res = await fetch(`${API_BASE_URL}/team`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch team members');
    return data.data;
  },
  async createTeamMember(memberData) {
    const res = await fetch(`${API_BASE_URL}/team`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(memberData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create team member');
    return data.data;
  },
  async updateTeamMember(id, memberData) {
    const res = await fetch(`${API_BASE_URL}/team/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(memberData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update team member');
    return data.data;
  },
  async deleteTeamMember(id) {
    const res = await fetch(`${API_BASE_URL}/team/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete team member');
    return data;
  },

  // Portfolio
  async getPortfolio() {
    const res = await fetch(`${API_BASE_URL}/portfolio`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch portfolio projects');
    return data.data;
  },
  async createPortfolio(projectData) {
    const res = await fetch(`${API_BASE_URL}/portfolio`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(projectData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create portfolio project');
    return data.data;
  },
  async updatePortfolio(id, projectData) {
    const res = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(projectData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update portfolio project');
    return data.data;
  },
  async deletePortfolio(id) {
    const res = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete portfolio project');
    return data;
  }
};
