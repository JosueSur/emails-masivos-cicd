import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const { token, user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar si el token es válido
  useEffect(() => {
    const checkToken = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:8001/api/auth/validate-token');
        
        if (response.data.valid) {
          setUser(response.data.user);
        } else {
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
      checkToken();
    } else {
      setLoading(false);
    }
  }, [token, navigate, setUser, user]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <Navigate to="/login" state={{ error }} />;
  }

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
