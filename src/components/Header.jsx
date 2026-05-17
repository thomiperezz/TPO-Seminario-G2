import React from 'react';
import '../assets/styles/global.css';

const Header = ({ user, onAdd }) => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#fff', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>Bienvenido/a, {user}</h2>
      <button className="add-course-btn" onClick={onAdd}>Agregar curso</button>
    </header>
  );
};

export default Header;
