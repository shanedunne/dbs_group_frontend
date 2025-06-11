import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Projects API calls
export const projectsAPI = {
  getAll: (params = {}) => api.get('/projects', { params }),
  getFeatured: (params = {}) => api.get('/projects/featured', { params }),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
  getByCategory: (category, params = {}) => api.get(`/projects/category/${category}`, { params }),
};

// Admin API calls
export const adminAPI = {
  // Projects management
  getAllProjects: (params = {}) => api.get('/admin/projects', { params }),
  getProject: (id) => api.get(`/admin/projects/${id}`),
  createProject: (projectData) => api.post('/admin/projects', projectData),
  updateProject: (id, projectData) => api.put(`/admin/projects/${id}`, projectData),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),
  
  // Image management
  uploadImages: (formData) => api.post('/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteImage: (publicId) => api.delete(`/admin/images/${publicId}`),
};

// Contact API calls
export const contactAPI = {
  submit: (formData) => api.post('/contact', formData),
};

// Content API calls
export const contentAPI = {
  getPageContent: (page, section = null) => {
    const params = section ? { section } : {};
    return api.get(`/content/${page}`, { params });
  },
  updateContent: (page, section, content) => api.put(`/content/${page}/${section}`, { content }),
};

// Client Logos API
export const clientLogosAPI = {
  getAll: () => api.get('/client-logos'),
  getAllAdmin: () => api.get('/client-logos/admin'),
  create: (logoData) => api.post('/client-logos', logoData),
  update: (id, logoData) => api.put(`/client-logos/${id}`, logoData),
  delete: (id) => api.delete(`/client-logos/${id}`),
};

export default api;