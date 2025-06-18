import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

const roleService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/roles`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByName: async (name) => {
    try {
      const response = await axios.get(`${API_URL}/roles/name/${name}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/roles`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/roles/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}/roles/${id}`);
    } catch (error) {
      throw error;
    }
  }
};

export default roleService;
