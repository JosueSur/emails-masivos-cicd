import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../src/components/auth/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { logout, user } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Clientes', path: '/dashboard/clientes', icon: '👥' },
    { name: 'Registros', path: '/dashboard/registros', icon: '📝' },
    { name: 'Usuarios', path: '/dashboard/usuarios', icon: '👤' },
    { name: 'Roles', path: '/dashboard/roles', icon: '👑' },
    { name: 'Estados', path: '/dashboard/estados', icon: '📊' }
  ];

  return (
    <div className="fixed inset-y-0 mt-24 left-0 w-56 bg-white shadow-lg">
      <nav className="mt-5 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-full border-t p-4">
      <div className="p-4 border-b">
        <div className="flex flex-col items-center">
          <div className="text-gray-700 text-md font-medium mb-1 flex items-center">
            <div className="online-indicator"></div>
            {user?.nombre} {user?.apellido}
          </div>
        </div>
      </div>
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 rounded-md"
        >
          <span className="mr-3 text-xl">🚪</span>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
