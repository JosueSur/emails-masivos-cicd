import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Crear el contexto
const AuthContext = createContext(null);

// Funciones de autenticación
const authFunctions = {
  login: async (usuario, password) => {
    try {
      const response = await axios.post('http://localhost:8001/api/auth/login', {
        usuario,
        password
      });
      
      if (response.data.token) {
        return response.data;
      } else {
        throw new Error('No se recibió token válido');
      }
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post('http://localhost:8001/api/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  // Efecto para manejar el token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]); // This is correct - token is properly included in the dependency array

  // Efecto para verificar token en localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, [token]);

  const login = async (usuario, password) => {
    try {
      const response = await axios.post('http://localhost:8001/api/auth/login', {
        usuario,
        password
      });
      
      // Verificar si la respuesta tiene un token
      const responseData = response.data;
      
      // Si la respuesta tiene una estructura de éxito
      if (responseData.success && responseData.data) {
        const data = responseData.data;
        if (data.token) {
          setToken(data.token);
          setUser(data.user || null);
          localStorage.setItem('token', data.token);
          return data;
        }
      }
      
      // Si no encontramos el token en la respuesta
      throw new Error('No se recibió token válido');
    } catch (error) {
      // Si es un error de axios, mostrar el mensaje de error del backend
      if (error.response) {
        throw new Error(error.response.data?.message || error.message);
      }
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8001/api/auth/register', userData);
      setToken(response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    ...authFunctions,
    navigate,
    setToken,
    login,
    register,
    logout
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }

  return context;
};
