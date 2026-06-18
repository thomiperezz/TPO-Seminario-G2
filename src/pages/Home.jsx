import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Organizá tus clases',
    text: 'Administra cursos, actividades y materiales desde un único panel claro y práctico.',
  },
  {
    title: 'Seguimiento del aprendizaje',
    text: 'Observá el avance de cada estudiante y detectá rápidamente quienes necesitan apoyo.',
  },
  {
    title: 'Corrección eficiente',
    text: 'Revisá tareas y brindá retroalimentación de forma rápida, ordenada y consistente.',
  },
];

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-brand">
            <span className="home-brand-green">acompaña</span>
            <span className="home-brand-dark">educa</span>
          </span>
          <span className="home-badge">Herramienta para docentes</span>
          <h1>Gestioná tu clase con más organización y control</h1>
          <p>
            Planificá actividades, supervisá el progreso de tus alumnos y acompañá su aprendizaje de forma más eficiente.
          </p>
          <div className="home-actions">
            <Link to="/login" className="home-btn home-btn-primary">
              Iniciar sesión
            </Link>
            <Link to="/login" className="home-btn home-btn-secondary">
              Registrarse
            </Link>
          </div>
        </div>

        <div className="home-hero-card">
          <div className="home-card-top">
            <span>Rendimiento del grupo</span>
            <strong>87%</strong>
          </div>
          <div className="home-progress">
            <span></span>
          </div>
          <div className="home-card-stats">
            <div>
              <small>Cursos activos</small>
              <strong>6</strong>
            </div>
            <div>
              <small>Alumnos con seguimiento</small>
              <strong>128</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="home-features">
        {features.map((feature) => (
          <article className="home-feature-card" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>

      <section className="home-support">
        <div>
          <span className="home-badge">¿Por qué elegir esta plataforma?</span>
          <h2>Una herramienta pensada para acompañar al docente</h2>
          <p>
            Centralizá la gestión de tu curso, facilitá la revisión de tareas y tomá decisiones con una visión clara del progreso del grupo.
          </p>
        </div>
        <div className="home-support-list">
          <div>
            <strong>+120</strong>
            <span>materiales listos para usar</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>visibilidad del trabajo del curso</span>
          </div>
          <div>
            <strong>95%</strong>
            <span>eficiencia en la evaluación</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
