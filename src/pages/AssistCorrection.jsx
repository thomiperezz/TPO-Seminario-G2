import { useState } from 'react';
import Sidebar from '../components/navigation/Sidebar.jsx';
import FeedbackCard from '../components/ui/FeedbackCard.jsx';
import CodeViewer from '../components/ui/CodeViewer.jsx';
import ActiveParameters from '../components/course/ActiveParameters.jsx';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import '../assets/styles/global.css';

/**
 * Página AssistCorrection
 * Módulo de corrección asistida con análisis de código y retroalimentación de IA
 *
 * Funcionalidades:
 * - Selección de curso, alumno y entrega
 * - Visualización de código con colores sintácticos
 * - Panel de retroalimentación de IA con categorías
 * - Parámetros configurables con toggles
 * - Navegación de páginas
 */
const AssistCorrection = () => {
  // Estados para los selectores
  const [selectedCourse, setSelectedCourse] = useState('course-1');
  const [selectedStudent, setSelectedStudent] = useState('student-1');
  const [selectedDelivery, setSelectedDelivery] = useState('delivery-1');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(2);

  // Estados para parámetros activos
  const [showCopiedCode, setShowCopiedCode] = useState(true);
  const [showGenericExplanations, setShowGenericExplanations] = useState(true);
  const [showConceptualErrors, setShowConceptualErrors] = useState(true);

  // Datos de ejemplo - Cursos
  const courses = [
    { id: 'course-1', name: '3° B — Matemática' },
    { id: 'course-2', name: '3° A — Matemática' },
    { id: 'course-3', name: '4° B — Matemática' }
  ];

  // Datos de ejemplo - Alumnos
  const students = [
    { id: 'student-1', name: 'Lucas Rodríguez' },
    { id: 'student-2', name: 'Julián Méndez' },
    { id: 'student-3', name: 'María García' }
  ];

  // Datos de ejemplo - Entregas
  const deliveries = [
    { id: 'delivery-1', name: 'TP — Funciones' },
    { id: 'delivery-2', name: 'Trabajo práctico N° 1' },
    { id: 'delivery-3', name: 'Examen parcial' }
  ];

  // Retroalimentación de IA - Array de observaciones
  const feedbackItems = [
    {
      id: 'feedback-1',
      category: 'generic',
      title: 'EXPLICACIÓN GENÉRICA',
      text: 'La explicación escrita tiene un nivel técnico muy superior al resto del trabajo. Probablemente fue copiada de una fuente externa sin comprensión real.'
    },
    {
      id: 'feedback-2',
      category: 'complexity',
      title: 'CAMBIO DE COMPLEJIDAD',
      text: 'La afirmación "funciona bien para listas pequeñas" es informal y contrasta con la explicación técnica anterior. Sugiere que distintas partes fueron escritas por separado.'
    },
    {
      id: 'feedback-3',
      category: 'error',
      title: 'ERROR CONCEPTUAL',
      text: 'Bubble sort no es el algoritmo más eficiente para ordenar datos porque hace comparaciones de a dos elementos. Vale la pena preguntar al alumno si conoce alternativas.'
    }
  ];

  // Manejador para cuando el usuario marca un feedback como útil
  const handleUseful = (feedbackId) => {
    console.log(`Feedback ${feedbackId} marcado como útil`);
    // Aquí iría la lógica para enviar al backend
  };

  // Manejador para cuando el usuario descarta un feedback
  const handleDismiss = (feedbackId) => {
    console.log(`Feedback ${feedbackId} descartado`);
    // Aquí iría la lógica para enviar al backend
  };

  // Manejador para cambiar página
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <MainLayout>
      <Header
        title="Corrección asistida"
        breadcrumbs={[
          {
            label: 'Inicio',
            ruta: '/dashboard'
          },
          {
            label: 'Corrección asistida'
          }
        ]}
      />

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Controles - Selectores */}
        <div className="assist-correction-controls">
          <div className="control-group">
            <label className="control-label">Curso:</label>
            <select
              className="control-select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">Alumno:</label>
            <select
              className="control-select"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">Entrega:</label>
            <select
              className="control-select"
              value={selectedDelivery}
              onChange={(e) => setSelectedDelivery(e.target.value)}
            >
              {deliveries.map((delivery) => (
                <option key={delivery.id} value={delivery.id}>
                  {delivery.name}
                </option>
              ))}
            </select>
          </div>

          {/* Indicador de página */}
          <div className="page-indicator" style={{ marginLeft: 'auto' }}>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              title="Página anterior"
            >
              ‹
            </button>
            <span>{currentPage}/{totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              title="Siguiente página"
            >
              ›
            </button>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="assist-correction-main">
          {/* Columna Izquierda - Código y Explicación */}
          <CodeViewer
            header="TP — Algoritmos de ordenamiento · Entrega final · Hace 1 día"
            explanationTitle="Explicación"
            explanationText="El algoritmo de ordenamiento burbuja es un método de clasificación simple que funciona
                comparando repetidamente elementos adyacentes e intercambiándolos si están en el orden incorrecto,
                con una complejidad temporal de O(n²) en el peor caso."
            explanationLinks={[
              {
                text: 'Es el algoritmo más eficiente para ordenar datos',
                suffix: 'porque hace comparaciones de a dos elementos.',
                onClick: () =>
                  console.log('Ver alternativas de algoritmos más eficientes')
              }
            ]}
          >
            <span className="code-comment"># Ordenamiento burbuja</span>
            {'\n'}
            <span className="code-keyword">def</span>{' '}
            <span className="code-function">bubble_sort</span>
            <span>(lista):</span>
            {'\n'}
            {'    '}
            <span className="code-keyword">n</span> = len(lista)
            {'\n'}
            {'    '}
            <span className="code-keyword">for</span> i in range(n):
            {'\n'}
            {'        '}
            <span className="code-keyword">for</span> j in range(
            <span className="code-number">0</span>, n-
            <span className="code-number">1</span>):
            {'\n'}
            {'            '}
            <span className="code-keyword">if</span> lista[j] {'>'}
            lista[j+<span className="code-number">1</span>]:
            {'\n'}
            {'                '}
            lista[j], lista[j+<span className="code-number">1</span>] =
            lista[j+<span className="code-number">1</span>], lista[j]
            {'\n'}
            {'    '}
            <span className="code-keyword">return</span> lista
          </CodeViewer>

          {/* Columna Derecha - Observaciones de la IA */}
          <div className="observations-panel">
            <h3 className="observations-title">Observaciones de la IA</h3>

            {/* Tarjetas de feedback */}
            {feedbackItems.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                id={feedback.id}
                category={feedback.category}
                title={feedback.title}
                text={feedback.text}
                onUseful={handleUseful}
                onDismiss={handleDismiss}
              />
            ))}

            {/* Parámetros activos */}
            <ActiveParameters
              parameters={[
                {
                  id: 'copied-code',
                  label: 'Código copiado',
                  value: showCopiedCode,
                  onChange: setShowCopiedCode
                },
                {
                  id: 'generic-explanations',
                  label: 'Explicaciones genéricas',
                  value: showGenericExplanations,
                  onChange: setShowGenericExplanations
                },
                {
                  id: 'conceptual-errors',
                  label: 'Errores conceptuales',
                  value: showConceptualErrors,
                  onChange: setShowConceptualErrors
                }
              ]}
            />
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default AssistCorrection;
