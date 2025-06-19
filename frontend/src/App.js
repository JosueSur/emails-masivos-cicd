import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/auth/PrivateRoute';
import DashboardRoutes from './components/dashboard/routes';
import Clientes from './components/dashboard/Clientes';
import Registros from './components/dashboard/Registros';
import Usuarios from './components/dashboard/Usuarios';
import Roles from './components/dashboard/Roles';
import Estados from './components/dashboard/Estados';

function App() {
  console.log('App montado');
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas privadas */}
          <Route path="/dashboard/*" element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }>
            <Route path="clientes" element={<Clientes />} />
            <Route path="registros" element={<Registros />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="roles" element={<Roles />} />
            <Route path="estados" element={<Estados />} />
          </Route>
          
          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
