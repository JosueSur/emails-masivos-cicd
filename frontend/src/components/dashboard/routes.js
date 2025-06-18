import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Clientes from './Clientes';
import Registros from './Registros';
import Usuarios from './Usuarios';
import Roles from './Roles';
import Estados from './Estados';

const DashboardRoutes = () => {
  return (
    <Dashboard>
      <Routes>
        <Route index element={<div className="text-center py-24">Bienvenido al Dashboard</div>} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="registros" element={<Registros />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="roles" element={<Roles />} />
        <Route path="estados" element={<Estados />} />
      </Routes>
    </Dashboard>
  );
};

export default DashboardRoutes;
