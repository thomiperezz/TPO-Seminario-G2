import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import CourseCard from '../components/CourseCard.jsx';

const Course = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      {/* Contenedor del contenido principal */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 2rem',
            backgroundColor: '#fff',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--color-text)',
            }}
          >
            Cursos
          </h1>
          <button className="add-course-btn" onClick={() => navigate('/nuevo-curso')}>Agregar curso</button></div>

        <div
          style={{
            flex: 1,
            padding: '2rem',
            overflowY: 'auto',
            backgroundColor: 'var(--color-bg)',
          }}
        >
          <p className="card-title">Mis cursos</p>
          <div
            className="course-list"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '95%', // ocupar todo el ancho disponible
            }}
          >
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
  );
};

export default Course;