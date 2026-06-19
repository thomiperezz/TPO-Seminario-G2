import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import StatCard from '../components/ui/StatCard.jsx';
import ActivityItem from '../components/ui/ActivityItem.jsx';
import CourseCard from '../components/course/CourseCard.jsx';

const STORAGE_KEY = 'cursos-app';

const initialCourses = [
  {
    id: 'default-1',
    code: '3° B',
    name: 'Informática',
    info: '32 alumnos',
    alerts: '6 ⚠️',
    alertType: 'warning'
  },
  {
    id: 'default-2',
    code: '4° A',
    name: 'Programación',
    info: '28 alumnos',
    alerts: '✅',
    alertType: 'success'
  },
  {
    id: 'default-3',
    code: '5° C',
    name: 'Matemática',
    info: '30 alumnos',
    alerts: '3 ℹ️',
    alertType: 'info'
  }
];

const Dashboard = () => {
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
        />

        <StatCard
          title="Alumnos"
          value="342"
          description="Total registrados"
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
          <h2 className="card-title">
            Cursos
          </h2>

          <div className="course-list">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                code={course.code}
                name={course.name}
                info={course.info}
                alerts={course.alerts}
                alertType={course.alertType}
                onDelete={handleDeleteCourse}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;