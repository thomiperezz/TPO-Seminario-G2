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
        <a href="/courses" className="sidebar-link">Entregas</a>
        <a href="/correction" className="sidebar-link">Corrección asistida</a>
        <a href="/check" className="sidebar-link">Preguntas de repaso</a>
        <a href="/following" className="sidebar-link">Seguimiento</a>
        <a href="/metrics" className="sidebar-link">Métricas del curso</a>
        <a href="/configuration" className="sidebar-link">Configuración</a>
        <a href="/profiles" className="sidebar-link">Perfil del alumno</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
