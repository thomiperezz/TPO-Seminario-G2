import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import StatCard from '../components/StatCard.jsx';
import ActivityItem from '../components/ActivityItem.jsx';
import CourseCard from '../components/CourseCard.jsx';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', backgroundColor: '#fff', borderBottom: '1px solid #E5E7EB' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text)' }}>Dashboard</h1>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Bienvenido/a, UADE User </span>
        </div>

        {/* Contenido */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', backgroundColor: 'var(--color-bg)' }}>
          {/* Tarjetas de estadísticas */}
          <div className="stats-grid">
            <StatCard 
              title="Cursos activos" 
              value="3" 
              description="Este cuatrimestre" 
            />
            <StatCard 
              title="Entregas sin revisar" 
              value="7" 
              description="En todos los cursos" 
            />
            <StatCard 
              title="Alertas pedagógicas" 
              value="9" 
              description="Requieren atención" 
            />
            <StatCard 
              title="Preguntas generadas" 
              value="28" 
              description="Para usar en clase" 
            />
          </div>

          {/* Grid de 2 columnas */}
          <div className="dashboard-grid">
            {/* Actividad reciente */}
            <div className="card">
              <p className="card-title">Actividad reciente</p>
              <div className="activity-list">
                <ActivityItem 
                  icon="📋"
                  title="Código copiado sin modificaciones"
                  description="Julián Méndez · 3° B Informática · TP Algoritmos"
                  type="error"
                />
                <ActivityItem 
                  icon="⚠️"
                  title="Explicación genérica del código"
                  description="Lucas Rodríguez · 3° B Informática · Trabajo práctico"
                  type="warning"
                />
                <ActivityItem 
                  icon="ℹ️"
                  title="Error conceptual en estructura de datos"
                  description="Sofía Pérez · 4° A Informática · Parcial"
                  type="info"
                />
              </div>
            </div>

            {/* Mis cursos */}
            <div className="card">
              <p className="card-title">Mis cursos</p>
              <div className="course-list">
                <CourseCard 
                  code="3° B"
                  name="3° B — Informática"
                  info="28 alumnos · 3 actividades activas"
                  alerts="6 alertas"
                  alertType="warning"
                />
                <CourseCard 
                  code="4° A"
                  name="4° A — Tecnologías de la Información"
                  info="25 alumnos · 2 actividades activas"
                  alerts="3 alertas"
                  alertType="info"
                />
                <CourseCard 
                  code="5° C"
                  name="5° C — Programación"
                  info="22 alumnos · 1 actividad activa"
                  alerts="Sin alertas"
                  alertType="success"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
