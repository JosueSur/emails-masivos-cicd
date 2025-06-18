import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

const usuarioService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getActive: async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios/activos`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByRole: async (roleId) => {
    try {
      const response = await axios.get(`${API_URL}/usuarios/role/${roleId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByEmail: async (email) => {
    try {
      const response = await axios.get(`${API_URL}/usuarios/email/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByUsername: async (username) => {
    try {
      const response = await axios.get(`${API_URL}/usuarios/username/${username}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/usuarios`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/usuarios/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}/usuarios/${id}`);
    } catch (error) {
      throw error;
    }
  },

  incrementConnections: async (id) => {
    try {
      await axios.post(`${API_URL}/usuarios/${id}/connections`);
    } catch (error) {
      throw error;
    }
  }
};

export default usuarioService;
