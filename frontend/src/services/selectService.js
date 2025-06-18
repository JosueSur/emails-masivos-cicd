import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

const selectService = {
  getUsuarios: async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      return response.data.map(usuario => ({
        value: usuario.id_usuario,
        label: `${usuario.nombre} ${usuario.apellido}`
      }));
    } catch (error) {
      throw error;
    }
  },

  getEstados: async () => {
    try {
      const response = await axios.get(`${API_URL}/estados`);
      return response.data.map(estado => ({
        value: estado.id_estado,
        label: estado.descripcion
      }));
    } catch (error) {
      throw error;
    }
  },

  getRoles: async () => {
    try {
      const response = await axios.get(`${API_URL}/roles`);
      return response.data.map(rol => ({
        value: rol.id_role,
        label: rol.nombre
      }));
    } catch (error) {
      throw error;
    }
  }
};

export default selectService;
