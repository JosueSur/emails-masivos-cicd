import React from 'react';
import './Header.css';

const Header = () => {

  return (
    <header className="header fixed top-0 right-0 w-full h-24 shadow z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-content-center">
        <div className="logo-container justify-center">
          <img src="/logo.png" alt="Prodeman" className="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
