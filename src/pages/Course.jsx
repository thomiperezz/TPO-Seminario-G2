import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import CourseCard from '../components/course/CourseCard';

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
  },
  {
    id: 'default-4',
    code: '6° A',
    name: 'Base de Datos',
    info: '25 alumnos',
    alerts: '1 ⚠️',
    alertType: 'warning'
  }
];

const Course = () => {
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
        title="Cursos"
        subtitle="Administración de cursos activos"
        actionText="Nuevo curso"
        onAction={() => navigate('/nuevo-curso')}
        breadcrumbs={[
          {
            label: 'Inicio',
            ruta: '/dashboard'
          },
          {
            label: 'Cursos'
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
    </MainLayout>
  );
};

export default Course;