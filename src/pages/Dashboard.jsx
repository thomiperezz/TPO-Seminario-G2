import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import StatCard from '../components/ui/StatCard.jsx';
import ActivityItem from '../components/ui/ActivityItem.jsx';
import CourseCard from '../components/course/CourseCard.jsx';

const Dashboard = () => {
  return (
    <MainLayout>
      <Header
        title="Dashboard"
        subtitle="Resumen general de actividad docente"
        /*actionText="Agregar curso"
        onAction={() => console.log('Agregar curso')}*/
        breadcrumbs={[
          {
            label: 'Inicio',
            ruta: '/dashboard'
          }
        ]}
      />
      
      <div className="stats-grid">
        <StatCard
          title="Cursos"
          value="12"
          description="Cursos activos"
        />

        <StatCard
          title="Alumnos"
          value="342"
          description="Total registrados"
        />

        <StatCard
          title="Alertas"
          value="18"
          description="Requieren revisión"
        />

        <StatCard
          title="Correcciones"
          value="96"
          description="Realizadas esta semana"
        />
      </div>
      <div className="dashboard-grid">
        <div className="card">
          <h2 className="card-title">
            Actividad reciente
          </h2>

          <div className="activity-list">

            <ActivityItem
              icon="⚠️"
              type="error"
              title="Posible código copiado"
              description="4° A - Lucas Rodríguez"
            />

            <ActivityItem
              icon="🔔"
              type="warning"
              title="Corrección pendiente"
              description="3° B Matemática - María Gómez"
            />

            <ActivityItem
              icon="ℹ️"
              type="info"
              title="Nueva entrega"
              description="5° C Matemática - Juan Pérez"
            />

          </div>
        </div>
        <div className="card">
          <h2 className="card-title">
            Cursos
          </h2>

          <div className="course-list">

            <CourseCard
              code="3° B"
              name="Matemática"
              info="32 alumnos"
              alerts="6 alertas"
              alertType="warning"
            />

            <CourseCard
              code="4° A"
              name="Matemática"
              info="28 alumnos"
              alerts="Sin alertas"
              alertType="success"
            />

            <CourseCard
              code="5° C"
              name="Matemática"
              info="30 alumnos"
              alerts="3 alertas"
              alertType="info"
            />

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;