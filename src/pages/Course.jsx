import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import CourseCard from '../components/course/CourseCard';

const Course = () => {
  const navigate = useNavigate();
  
  const courses = [
    {
      code: '3° B',
      name: 'Matemática',
      info: '32 alumnos',
      alerts: '6 ⚠️',
      alertType: 'warning'
    },
    {
      code: '4° A',
      name: 'Matemática',
      info: '28 alumnos',
      alerts: '✅',
      alertType: 'success'
    },
    {
      code: '5° C',
      name: 'Matemática',
      info: '30 alumnos',
      alerts: '3 ℹ️',
      alertType: 'info'
    },
    {
      code: '6° A',
      name: 'Matemática',
      info: '25 alumnos',
      alerts: '1 ⚠️',
      alertType: 'warning'
    }
  ];

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
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard
            key={`${course.code}-${course.name}`}
            code={course.code}
            name={course.name}
            info={course.info}
            alerts={course.alerts}
            alertType={course.alertType}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default Course;