import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const { token, user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('PrivateRoute:', { token, user, loading });

  // Verificar si el token es válido
  useEffect(() => {
    console.log('Verificando token...');
    const checkToken = async () => {
      try {
        if (!token) {
          console.log('No hay token');
          throw new Error('No token found');
        }

        console.log('Validando token...');
        const response = await axios.get('http://localhost:8001/api/auth/validate-token');
        console.log('Respuesta de validación:', response.data);
        
        if (response.data.valid) {
          console.log('Token válido');
          setUser(response.data.user);
        } else {
          console.log('Token inválido');
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error('Token validation error:', error);
        localStorage.removeItem('token');
        setError(error.message || 'Error de autenticación');
        navigate('/login', { replace: true, state: { error: error.message } });
      } finally {
        setLoading(false);
      }
    };

    if (token && !user) {
      console.log('Token encontrado, validando...');
      checkToken();
    } else {
      console.log('No hay token o ya hay usuario');
      setLoading(false);
    }
  }, [token, navigate, setUser, user]);

  if (loading) {
    console.log('PrivateRoute en estado de loading');
    return <div>Cargando...</div>;
  }

  if (error) {
    console.log('PrivateRoute con error:', error);
    return <Navigate to="/login" state={{ error }} />;
  }

  console.log('PrivateRoute renderizando children');
  return children;
};

export default PrivateRoute;
