import React from 'react';
import '../assets/styles/global.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">
          <span style={{ color: 'rgb(5,150,105)' }}>acompaña</span>
          <span>educa</span>
        </h1>
      </div>
      <div className="sidebar-menu-label">MENÚ</div>
      <nav className="sidebar-nav">
        <a href="/dashboard" className="sidebar-link active">Dashboard</a>
        <a href="/courses" className="sidebar-link">Cursos</a>
        <a href="/correction" className="sidebar-link">Corrección asistida</a>
        <a href="/questions" className="sidebar-link">Preguntas de repaso</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
