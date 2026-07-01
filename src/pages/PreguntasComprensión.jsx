import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import '../assets/styles/global.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Página de Preguntas de Repaso
 * Muestra una lista de preguntas generadas por IA basadas en el trabajo del alumno.
 */
const PreguntasComprensión = () => {
  const handleExport = () => {
    const contenido = questions
      .map((question, index) => `${index + 1}. ${question}`)
      .join('\n\n');

    const blob = new Blob([contenido], { type: 'text/plain' });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'preguntas-comprension.txt';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const courseProfiles = {
    'course-1': {
      name: '3° B — Informática',
      students: [
        { id: 'student-1', name: 'Lucas Rodríguez' },
        { id: 'student-2', name: 'Julián Méndez' },
        { id: 'student-3', name: 'María García' }
      ],
      deliveries: [
        { id: 'delivery-1', name: 'TP — Algoritmos de ordenamiento' },
        { id: 'delivery-2', name: 'Trabajo práctico N° 1' }
      ]
    },
    'course-2': {
      name: '3° A — Matemática',
      students: [
        { id: 'student-4', name: 'Sofía Pérez' },
        { id: 'student-5', name: 'Mateo Silva' }
      ],
      deliveries: [
        { id: 'delivery-3', name: 'TP — Ecuaciones lineales' },
        { id: 'delivery-4', name: 'Parcial de álgebra' }
      ]
    }
  };

  const [selectedCourse, setSelectedCourse] = useState('course-1');
  const [selectedStudent, setSelectedStudent] = useState('student-1');
  const [selectedDelivery, setSelectedDelivery] = useState('delivery-1');
  const [selectedExercise, setSelectedExercise] = useState(1);
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubmission, setLoadingSubmission] = useState(false);
  const [studentText, setStudentText] = useState('');
  const [submissionLoaded, setSubmissionLoaded] = useState(false);

  const selectedCourseData = courseProfiles[selectedCourse] || courseProfiles['course-1'];
  const currentStudent = selectedCourseData.students.find((student) => student.id === selectedStudent) || selectedCourseData.students[0];
  const currentDelivery = selectedCourseData.deliveries.find((delivery) => delivery.id === selectedDelivery) || selectedCourseData.deliveries[0];

  const handleLoadSubmission = async () => {
    try {
      setLoadingSubmission(true);
      setQuestions([]);

      const response = await fetch(`${API_BASE_URL}/api/evaluation/student-work/exercise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourse,
          studentId: selectedStudent,
          deliveryName: currentDelivery?.name || selectedDelivery,
          exerciseNumber: selectedExercise,
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo cargar la entrega');
      }

      const data = await response.json();
      setStudentText(data.submittedWork || data.content || data.answer || '');
      setTopic(data.originalAssignment || data.topic || data.assignment || '');
      setSubmissionLoaded(true);
    } catch (error) {
      console.error(error);
      alert('No se pudo cargar el trabajo del alumno.');
    } finally {
      setLoadingSubmission(false);
    }
  };

  const generateQuestions = async () => {
    if (!topic.trim() || !studentText.trim()) {
      alert('Primero cargá el trabajo del alumno y la tarea original.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/evaluation/questions?originalAssignment=${encodeURIComponent(topic)}&questionCount=${questionCount}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: studentText,
        }
      );

      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      alert('Error generando preguntas: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Header
        title="Preguntas de Comprensión"
        actionText="Exportar preguntas"
        onAction={handleExport}
        breadcrumbs={[
          {
            label: 'Inicio',
            ruta: '/dashboard'
          },
          {
            label: 'Preguntas de Comprensión'
          }
        ]}
      />
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', backgroundColor: 'var(--color-bg)' }}>

        <div
          style={{
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Curso:</label>
              <select
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setSubmissionLoaded(false);
                  setStudentText('');
                  setTopic('');
                  setQuestions([]);
                }}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
              >
                {Object.entries(courseProfiles).map(([id, course]) => (
                  <option key={id} value={id}>{course.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Alumno:</label>
              <select
                value={selectedStudent}
                onChange={(e) => {
                  setSelectedStudent(e.target.value);
                  setSubmissionLoaded(false);
                  setStudentText('');
                  setTopic('');
                  setQuestions([]);
                }}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
              >
                {selectedCourseData.students.map((student) => (
                  <option key={student.id} value={student.id}>{student.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Entrega:</label>
              <select
                value={selectedDelivery}
                onChange={(e) => {
                  setSelectedDelivery(e.target.value);
                  setSubmissionLoaded(false);
                  setStudentText('');
                  setTopic('');
                  setQuestions([]);
                }}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
              >
                {selectedCourseData.deliveries.map((delivery) => (
                  <option key={delivery.id} value={delivery.id}>{delivery.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Número de ejercicio:</label>
              <select
                value={selectedExercise}
                onChange={(e) => {
                  setSelectedExercise(Number(e.target.value));
                  setSubmissionLoaded(false);
                  setStudentText('');
                  setTopic('');
                  setQuestions([]);
                }}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
              >  
                <option>Ejercicio 1</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <button
              onClick={handleLoadSubmission}
              disabled={loadingSubmission}
              style={{
                padding: '10px 16px',
                border: 'none',
                borderRadius: '8px',
                background: '#1D9E75',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {loadingSubmission ? 'Cargando...' : 'Cargar trabajo'}
            </button>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Texto del alumno:</label>
            <textarea
              value={studentText}
              onChange={(e) => setStudentText(e.target.value)}
              rows={6}
              placeholder="El contenido se completará automáticamente al cargar el trabajo del alumno..."
              style={{
                width: '97%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                resize: 'vertical',
                fontSize: '14px',
              }}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Tarea original:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="La consigna se completará automáticamente al cargar el trabajo del alumno"
              style={{
                width: '97%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB'
              }}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Cantidad de preguntas:</label>
            <input
              type="number"
              min="3"
              max="10"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              style={{
                width: '90px',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB'
              }}
            />
          </div>

          <button
            onClick={generateQuestions}
            disabled={loading || !submissionLoaded}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderRadius: '8px',
              background: submissionLoaded ? '#1D9E75' : '#9CA3AF',
              color: '#fff',
              cursor: submissionLoaded ? 'pointer' : 'not-allowed'
            }}
          >
            {loading ? 'Generando...' : 'Generar'}
          </button>
        </div>
        {/* Banner Informativo */}
        <div style={{ 
          background: '#F3F4F6', 
          borderRadius: '12px', 
          padding: '16px 20px', 
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid #E5E7EB'
        }}>
          <span style={{ fontSize: '18px' }}>ℹ️</span>
          <p style={{ margin: 0, fontSize: '13px', color: '#4B5563', lineHeight: '1.5' }}>
            La IA generará preguntas orientadas a verificar la comprensión real de los conceptos trabajados por el alumno.
          </p>
        </div>
        <div style={{
            borderTop: '1px solid #E5E7EB',
            margin: '24px 0',
          }} />
        {/* Lista de Tarjetas de Preguntas */}
        {!loading && questions.length === 0 && (
          <div className='no-content-placeholder'>
            Cargá un trabajo del alumno desde el formulario para poder generar preguntas de comprensión.
          </div>
        )}
        {loading && (
          <div className='no-content-placeholder'>
            Generando preguntas con IA...
          </div>
        )}
        {!loading && questions.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
            {questions.map((question, index) => (
              <div
                key={index}
                className="question-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6B7280',
                    marginBottom: '8px'
                  }}
                >
                  Pregunta {index + 1}
                </div>

                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#111827',
                    lineHeight: '1.4'
                  }}
                >
                  {question}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </MainLayout>
  );
};

export default PreguntasComprensión;