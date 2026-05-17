import React from 'react';
import '../assets/styles/global.css';

const Header = ({ user }) => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#fff', boxShadow: 'var(--shadow-sm)' }}>
      <span style={{ color: 'var(--color-text-secondary)' }}>
        Bienvenido/a, {user}
      </span>
    </header>
  );
};

export default Header;
