import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import StatCard from '../components/ui/StatCard.jsx';
import ActivityItem from '../components/ui/ActivityItem.jsx';
import CourseCard from '../components/course/CourseCard.jsx';

const STORAGE_KEY = 'cursos-app';

const initialCourses = [
  { id: 'default-1', code: '3° B', name: 'Matemática', info: '32 alumnos', alerts: '6 ⚠️', alertType: 'warning' },
  { id: 'default-2', code: '4° A', name: 'Física', info: '28 alumnos', alerts: '✅', alertType: 'success' },
  { id: 'default-3', code: '5° C', name: 'Química', info: '30 alumnos', alerts: '3 ℹ️', alertType: 'info' },
  { id: 'default-4', code: '6° A', name: 'Biología', info: '25 alumnos', alerts: '1 ⚠️', alertType: 'warning' },
  { id: 'default-5', code: '3° A', name: 'Álgebra', info: '31 alumnos', alerts: '✅', alertType: 'success' },
  { id: 'default-6', code: '4° B', name: 'Geometría', info: '29 alumnos', alerts: '2 ⚠️', alertType: 'warning' },
  { id: 'default-7', code: '5° A', name: 'Estadística', info: '27 alumnos', alerts: '✅', alertType: 'success' },
  { id: 'default-8', code: '6° B', name: 'Informática', info: '33 alumnos', alerts: '4 ⚠️', alertType: 'warning' },
  { id: 'default-9', code: '3° C', name: 'Programación', info: '26 alumnos', alerts: '✅', alertType: 'success' },
  { id: 'default-10', code: '4° C', name: 'Astronomía', info: '28 alumnos', alerts: '1 ℹ️', alertType: 'info' },
  { id: 'default-11', code: '5° B', name: 'Laboratorio de Ciencias', info: '24 alumnos', alerts: '✅', alertType: 'success' },
  { id: 'default-12', code: '6° C', name: 'Cálculo', info: '29 alumnos', alerts: '2 ℹ️', alertType: 'info' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem(STORAGE_KEY);

    if (!savedCourses) {
      return initialCourses;
    }

    try {
      return JSON.parse(savedCourses);
    } catch {
      return initialCourses;
    }
  });
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  }, [courses]);

  const handleDeleteCourse = (courseId, courseName) => {
    setCourseToDelete({ id: courseId, name: courseName });
  };

  const confirmDeleteCourse = () => {
    if (!courseToDelete) {
      return;
    }

    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseToDelete.id)
    );
    setCourseToDelete(null);
  };

  const cancelDeleteCourse = () => {
    setCourseToDelete(null);
  };

  return (
    <MainLayout>
      <Header
        title="Vista General"
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

      {courseToDelete && (
        <div className="delete-modal-overlay" onClick={cancelDeleteCourse}>
          <div className="delete-modal" onClick={(event) => event.stopPropagation()}>
            <div className="delete-modal-icon">!</div>
            <h3 className="delete-modal-title">¿Desea eliminar el curso?</h3>
            <p className="delete-modal-text">
              Está a punto de eliminar <strong>{courseToDelete.name}</strong>.
              <br />
              ¿Quiere eliminar el curso?
            </p>
            <div className="delete-modal-actions">
              <button className="delete-modal-button delete-modal-button--cancel" onClick={cancelDeleteCourse}>
                Volver
              </button>
              <button className="delete-modal-button delete-modal-button--confirm" onClick={confirmDeleteCourse}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="stats-grid">
        <StatCard
          title="Cursos"
          value="12"
          description="Cursos activos"
          onClick={() => navigate('/course')}
        />

        <StatCard
          title="Alumnos"
          value="342"
          description="Total registrados"
          onClick={() => navigate('/alumnos')}
        />

        <StatCard
          title="Notificaciones"
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
              description="4° A TP Algoritmos - Lucas Rodríguez"
            />

            <ActivityItem
              icon="🔔"
              type="warning"
              title="Corrección pendiente"
              description="3° B Informática - María Gómez"
            />

            <ActivityItem
              icon="ℹ️"
              type="info"
              title="Nueva entrega"
              description="5° C Matemática Aplicada - Juan Pérez"
            />

          </div>
        </div>
       <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="card-title" style={{ margin: 0 }}>Correcciones pendientes</h2>
            <span style={{ fontSize: '12px', background: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: '999px', fontWeight: '600' }}>
              4 pendientes
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { alumno: 'Lucas Rodríguez', actividad: 'TP — Algoritmos de ordenamiento', curso: '3° B · Informática', fecha: '20 jun', urgente: true },
              { alumno: 'Julián Méndez', actividad: 'Parcial — Estructuras de control', curso: '3° B · Informática', fecha: '20 jun', urgente: true },
              { alumno: 'Bruno Castro', actividad: 'Ejercicio de funciones', curso: '4° A · Programación', fecha: '21 jun', urgente: false },
              { alumno: 'Joaquín Vargas', actividad: 'Práctica — Ecuaciones', curso: '5° C · Matemática', fecha: '22 jun', urgente: false },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${item.urgente ? '#FED7AA' : '#E5E7EB'}`,
                  background: item.urgente ? '#FFFBEB' : '#F9FAFB',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                {/* Avatar */}
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                  background: item.urgente ? '#FEF3C7' : '#E0F2FE',
                  color: item.urgente ? '#92400E' : '#0369A1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '700'
                }}>
                  {item.alumno.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.actividad}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    {item.alumno} · {item.curso}
                  </div>
                </div>

                {/* Fecha y badge */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>📅 {item.fecha}</span>
                  {item.urgente && (
                    <span style={{ fontSize: '10px', background: '#FEE2E2', color: '#B91C1C', padding: '2px 7px', borderRadius: '999px', fontWeight: '700' }}>
                      Urgente
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '14px', textAlign: 'center' }}>
            <button
              style={{
                fontSize: '12px', color: '#1D9E75', background: 'none',
                border: '1px solid #1D9E75', borderRadius: '8px',
                padding: '7px 16px', cursor: 'pointer', fontWeight: '600'
              }}
            >
              Ver todas las pendientes
            </button>
          </div>
        </div>
        </div>
    </MainLayout>
  );
};

export default Dashboard;