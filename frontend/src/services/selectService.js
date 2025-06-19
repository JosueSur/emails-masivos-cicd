import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

const getUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuario/obtener-usuarios`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

const getEstados = async () => {
  try {
    const response = await axios.get(`${API_URL}/estado/obtener-estados`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener estados:', error);
    throw error;
  }
};

const getSociedades = async () => {
  try {
    const response = await axios.get(`${API_URL}/sociedad/obtener-sociedades`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener sociedades:', error);
    throw error;
  }
};

const selectService = {
  getUsuarios,
  getEstados,
  getSociedades
};

export default selectService;