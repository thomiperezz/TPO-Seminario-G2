import { useEffect, useState } from 'react';
import FeedbackCard from '../components/ui/FeedbackCard.jsx';
import CodeViewer from '../components/ui/CodeViewer.jsx';
import ActiveParameters from '../components/course/ActiveParameters.jsx';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import '../assets/styles/global.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

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

  const courseProfiles = {
    'course-1': {
      name: '3° B — Informática',
      subject: 'Informática',
      accent: '#1D9E75',
      students: [
        { id: 'student-1', name: 'Lucas Rodríguez' },
        { id: 'student-2', name: 'Julián Méndez' },
        { id: 'student-3', name: 'María García' }
      ],
      deliveries: [
        {
          id: 'delivery-1',
          name: 'TP — Algoritmos de ordenamiento',
          submittedWork: `
    def bubble_sort(lista):
        n = len(lista)

        for i in range(n):
            for j in range(0, n - 1):
                if lista[j] > lista[j + 1]:
                    lista[j], lista[j + 1] = lista[j + 1], lista[j]

        return lista
    `,
          explanation: `
    El algoritmo de ordenamiento burbuja compara pares consecutivos e intercambia los elementos si están fuera de orden.
    En el peor caso, su complejidad temporal es O(n²), aunque funciona bien para listas pequeñas.
    `
        },
        {
          id: 'delivery-2',
          name: 'Trabajo práctico N° 1',
          submittedWork: `
    def calcular_promedio(notas):
        return sum(notas) / len(notas)
    `,
          explanation: `
    La solución propone una función simple para calcular el promedio de una lista de notas.
    El alumno identifica correctamente la necesidad de sumar todos los elementos y dividir por la cantidad total.
    `
        },
        {
          id: 'delivery-3',
          name: 'Examen parcial',
          submittedWork: `
    for i in range(10):
        print(i)
    `,
          explanation: `
    La respuesta muestra un uso básico de estructuras repetitivas para recorrer una secuencia.
    Se observa comprensión del flujo del bucle, aunque podría mejorarse la explicación de su finalidad.
    `
        }
      ]
    },
    'course-2': {
      name: '3° A — Matemática',
      subject: 'Matemática',
      accent: '#EAB308',
      students: [
        { id: 'student-4', name: 'Sofía Pérez' },
        { id: 'student-5', name: 'Mateo Silva' },
        { id: 'student-6', name: 'Camila Torres' }
      ],
      deliveries: [
        {
          id: 'delivery-4',
          name: 'TP — Ecuaciones lineales',
          submittedWork: `
    2x + 5 = 13
    2x = 8
    x = 4
    `,
          explanation: `
    El estudiante resuelve correctamente la ecuación aplicando operaciones inversas.
    La respuesta demuestra comprensión del procedimiento para despejar la variable.
    `
        },
        {
          id: 'delivery-5',
          name: 'Parcial de álgebra',
          submittedWork: `
    (a + b)^2 = a^2 + 2ab + b^2
    `,
          explanation: `
    Se identifica correctamente la identidad notable y su aplicación.
    Podría agregarse un ejemplo concreto para reforzar la explicación.
    `
        }
      ]
    },
    'course-3': {
      name: '4° B — Física',
      subject: 'Física',
      accent: '#2563EB',
      students: [
        { id: 'student-7', name: 'Nicolás Díaz' },
        { id: 'student-8', name: 'Valentina López' },
        { id: 'student-9', name: 'Tomás Romero' }
      ],
      deliveries: [
        {
          id: 'delivery-6',
          name: 'Práctica — Movimiento rectilíneo',
          submittedWork: `
    v = d / t
    v = 100 / 20
    v = 5 m/s
    `,
          explanation: `
    El análisis usa la relación entre velocidad, distancia y tiempo de forma correcta.
    La explicación podría precisar mejor el significado físico de los resultados.
    `
        },
        {
          id: 'delivery-7',
          name: 'Trabajo de laboratorio',
          submittedWork: `
    F = m * a
    F = 2 * 3
    F = 6 N
    `,
          explanation: `
    La resolución muestra una buena comprensión de la segunda ley de Newton.
    Se recomienda aclarar las unidades y el contexto del problema.
    `
        }
      ]
    }
  };

  const courses = Object.entries(courseProfiles).map(([id, profile]) => ({
    id,
    name: profile.name,
    subject: profile.subject,
    accent: profile.accent
  }));

  const [workName, setWorkName] = useState('');
  const [submittedWork, setSubmittedWork] = useState('');
  const [explanation, setExplanation] = useState('');
  const [submissionLoaded, setSubmissionLoaded] = useState(false);
  const [showLoadedContent, setShowLoadedContent] = useState(false);
  const [loadingSubmission, setLoadingSubmission] = useState(false);
  const [loadedWork, setLoadedWork] = useState(null);
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [finalComment, setFinalComment] = useState('');
  const [score, setScore] = useState('');
  const [savedStatus, setSavedStatus] = useState('');

  const selectedCourseData = courseProfiles[selectedCourse] || courseProfiles['course-1'];
  const currentStudent = selectedCourseData.students.find((student) => student.id === selectedStudent) || selectedCourseData.students[0];
  const currentDelivery = selectedCourseData.deliveries.find((delivery) => delivery.id === selectedDelivery) || selectedCourseData.deliveries[0];
  const canGenerateObservations = submissionLoaded && workName.trim() && submittedWork.trim() && explanation.trim();
  const usefulCount = observations.filter((obs) => obs.status === 'useful').length;
  const dismissedCount = observations.filter((obs) => obs.status === 'dismissed').length;

  useEffect(() => {
    if (!selectedCourseData.students.some((student) => student.id === selectedStudent)) {
      setSelectedStudent(selectedCourseData.students[0]?.id || 'student-1');
    }

    if (!selectedCourseData.deliveries.some((delivery) => delivery.id === selectedDelivery)) {
      setSelectedDelivery(selectedCourseData.deliveries[0]?.id || 'delivery-1');
    }
  }, [selectedCourse, selectedCourseData, selectedStudent, selectedDelivery]);

  const generateObservations = async () => {
    if (!canGenerateObservations) {
      alert('Completá el nombre de la actividad, el código del alumno y la explicación antes de generar observaciones.');
      return;
    }

    try {
      setLoading(true);
      setObservations([]);
      setSavedStatus('');

      const activeParameters = [];

      if (showCopiedCode) {
        activeParameters.push('Código copiado');
      }

      if (showGenericExplanations) {
        activeParameters.push('Explicaciones genéricas');
      }

      if (showConceptualErrors) {
        activeParameters.push('Errores conceptuales');
      }

      const response = await fetch(
        `${API_BASE_URL}/api/evaluation/observations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            workName,
            submittedWork,
            explanation,
            activeParameters,
          }),
        }
      );

      const data = await response.json();

      const formattedObservations = Object.entries(
        data.observations || {}
      ).map(([type, text], index) => {
        const normalizedType = type.toLowerCase();
        let category = 'generic';

        if (normalizedType.includes('error') || normalizedType.includes('conceptual')) {
          category = 'error';
        } else if (normalizedType.includes('complejidad') || normalizedType.includes('complexity')) {
          category = 'complexity';
        }

        return {
          id: `obs-${index}`,
          title: type.toUpperCase(),
          text,
          category,
          status: 'pending'
        };
      });

      setObservations(formattedObservations);
    } catch (error) {
      console.error(error);
      alert('No se pudieron generar las observaciones. Intentalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Manejador para cuando el usuario marca un feedback como útil
  const handleUseful = (feedbackId) => {
    setObservations((prev) =>
      prev.map((obs) =>
        obs.id === feedbackId ? { ...obs, status: 'useful' } : obs
      )
    );
  };

  // Manejador para cuando el usuario descarta un feedback
  const handleDismiss = (feedbackId) => {
    setObservations((prev) =>
      prev.map((obs) =>
        obs.id === feedbackId ? { ...obs, status: 'dismissed' } : obs
      )
    );
  };

  const handleLoadSubmission = async () => {
    try {
      setLoadingSubmission(true);
      setShowLoadedContent(false);
      setSavedStatus('');
      setObservations([]);

      const response = await fetch(`${API_BASE_URL}/api/evaluation/student-work`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourse,
          studentId: selectedStudent,
          deliveryName: currentDelivery?.name || selectedDelivery,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al obtener la entrega');
      }

      const data = await response.json();
      const submissionPayload = {
        workName: data.workName || data.title || data.name || currentDelivery?.name || '',
        submittedWork: data.submittedWork || data.code || data.content || data.answer || '',
        explanation: data.explanation || data.studentExplanation || data.comments || data.observations || '',
      };

      setLoadedWork(data);
      setWorkName(submissionPayload.workName);
      setSubmittedWork(submissionPayload.submittedWork);
      setExplanation(submissionPayload.explanation);
      setSubmissionLoaded(true);
      setShowLoadedContent(true);
    } catch (error) {
      console.error(error);
      alert('No se pudo cargar la entrega.');
    } finally {
      setLoadingSubmission(false);
    }
  };

  const handleSaveCorrection = () => {
    const correctionData = {
      course: selectedCourseData.name,
      student: currentStudent.name,
      delivery: currentDelivery.name,
      workName,
      score,
      finalComment,
      observations: observations.filter((obs) => obs.status !== 'dismissed')
    };

    localStorage.setItem(
      `correction-${selectedCourse}-${selectedStudent}-${selectedDelivery}`,
      JSON.stringify(correctionData)
    );

    setSavedStatus('Corrección guardada correctamente.');
  };

  const handleResetCorrection = () => {
    setObservations([]);
    setFinalComment('');
    setScore('');
    setSavedStatus('');
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
        <div className="assist-correction-controls" style={{ alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '999px',
              background: '#F9FAFB',
              border: '1px solid #E5E7EB'
            }}
          >
            <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>
              {selectedCourseData.subject}
            </span>
          </div>

          <div className="control-group">
            <label className="control-label">Curso:</label>
            <select
              className="control-select"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSubmissionLoaded(false);
                setShowLoadedContent(false);
                setWorkName('');
                setSubmittedWork('');
                setExplanation('');
                setLoadedWork(null);
              }}
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
              onChange={(e) => {
                setSelectedStudent(e.target.value);
                setSubmissionLoaded(false);
                setShowLoadedContent(false);
                setWorkName('');
                setSubmittedWork('');
                setExplanation('');
                setLoadedWork(null);
              }}
            >
              {selectedCourseData.students.map((student) => (
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
              onChange={(e) => {
                setSelectedDelivery(e.target.value);
                setSubmissionLoaded(false);
                setShowLoadedContent(false);
                setWorkName('');
                setSubmittedWork('');
                setExplanation('');
                setLoadedWork(null);
              }}
            >
              {selectedCourseData.deliveries.map((delivery) => (
                <option key={delivery.id} value={delivery.id}>
                  {delivery.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="add-course-btn"
            onClick={handleLoadSubmission}
            disabled={loadingSubmission}
            style={{ marginLeft: '8px' }}
          >
            {loadingSubmission ? 'Cargando...' : 'Cargar trabajo'}
          </button>

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

        <div
          style={{
            margin: '0 24px 18px',
            background: `linear-gradient(90deg, ${selectedCourseData.accent}14, #FFFFFF 60%)`,
            border: `1px solid ${selectedCourseData.accent}33`,
            borderRadius: '14px',
            padding: '16px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>
              Vista actual
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>
              {selectedCourseData.name} · {currentStudent.name}
            </div>
          </div>
          <div
            style={{
              background: selectedCourseData.accent,
              color: '#fff',
              padding: '6px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            {currentDelivery.name}
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="assist-correction-main">
          {/* Columna Izquierda - Trabajo del alumno cargado dinámicamente */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {showLoadedContent ? (
              <>
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '18px',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>Entrega seleccionada</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>{currentDelivery.name}</div>
                    </div>
                    <span
                      style={{
                        background: selectedCourseData.accent,
                        color: '#fff',
                        borderRadius: '999px',
                        padding: '6px 10px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      {selectedCourseData.subject}
                    </span>
                  </div>

                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Nombre de la actividad
                  </label>
                  <input
                    type="text"
                    value={workName}
                    onChange={(e) => setWorkName(e.target.value)}
                    style={{
                      width: '95%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      marginBottom: '12px'
                    }}
                  />

                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Código entregado por el alumno
                  </label>
                  <textarea
                    value={submittedWork}
                    onChange={(e) => setSubmittedWork(e.target.value)}
                    rows={10}
                    style={{
                      width: '95%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      resize: 'vertical',
                      fontFamily: 'monospace',
                      marginBottom: '12px'
                    }}
                  />

                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                    Explicación del alumno
                  </label>
                  <textarea
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    rows={5}
                    style={{
                      width: '95%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </>
            ) : (
              <div
                style={{
                  background: '#fff',
                  border: '1px dashed #E5E7EB',
                  borderRadius: '12px',
                  padding: '204px 24px',
                  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
                  textAlign: 'center',
                  color: '#6B7280'
                }}
              >
                <p style={{ margin: 0 }}>Seleccioná curso, alumno y entrega y cargá la entrega del alumno.</p>
              </div>
            )}
          </div>

          {/* Columna Derecha - Observaciones de la IA */}
          <div className="observations-panel">
            <h3 className="observations-title">Observaciones de la IA</h3>

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

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <button
                className="add-course-btn"
                onClick={generateObservations}
                disabled={loading || !canGenerateObservations}
              >
                {loading ? 'Generando...' : 'Generar observaciones'}
              </button>

              <button
                onClick={handleSaveCorrection}
                disabled={observations.length === 0}
                style={{
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#0F766E',
                  color: '#fff',
                  cursor: observations.length === 0 ? 'not-allowed' : 'pointer',
                  opacity: observations.length === 0 ? 0.6 : 1
                }}
              >
                Guardar corrección
              </button>

              <button
                onClick={handleResetCorrection}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  background: '#fff',
                  color: '#111827',
                  cursor: 'pointer'
                }}
              >
                Limpiar
              </button>
            </div>

            {savedStatus && (
              <div
                style={{
                  marginBottom: '12px',
                  fontSize: '12px',
                  color: '#047857',
                  background: '#ECFDF3',
                  borderRadius: '8px',
                  padding: '8px 10px'
                }}
              >
                {savedStatus}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
                  Nota final
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Ej: 8.5"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
                Comentario final del docente
              </label>
              <textarea
                value={finalComment}
                onChange={(e) => setFinalComment(e.target.value)}
                rows={4}
                placeholder="Escribí la devolución final para el alumno..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  resize: 'vertical'
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '12px'
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  background: '#ECFDF3',
                  color: '#047857',
                  padding: '4px 8px',
                  borderRadius: '999px'
                }}
              >
                Útiles: {usefulCount}
              </span>
              <span
                style={{
                  fontSize: '12px',
                  background: '#FEF2F2',
                  color: '#B91C1C',
                  padding: '4px 8px',
                  borderRadius: '999px'
                }}
              >
                Descartados: {dismissedCount}
              </span>
            </div>

            {/* Tarjetas de feedback */}
            {!loading && observations.length === 0 && (
              <div className="no-content-placeholder">
                Selecciona parámetros y generá observaciones con IA.
              </div>
            )}
            {loading && (
              <div className="no-content-placeholder">
                Generando observaciones con IA...
              </div>
            )}
            {observations
              .filter((feedback) => feedback.status !== 'dismissed')
              .map((feedback) => (
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
            {/* Recuadro de corrección de texto */}
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default AssistCorrection;
