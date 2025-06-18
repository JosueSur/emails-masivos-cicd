import React from 'react';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 right-0 w-full h-16 bg-white shadow z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold text-indigo-600">{user?.nombre}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="text-gray-700">{user?.username}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
