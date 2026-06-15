import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/navigation/Sidebar';
import NavRuta from '../components/navigation/NavRuta';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import '../assets/styles/global.css';

/**
 * Página de Preguntas de Repaso
 * Muestra una lista de preguntas generadas por IA basadas en el trabajo del alumno.
 */
const PreguntasComprensión = () => {
  const navigate = useNavigate();

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

  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentText, setStudentText] = useState('');

  const generateQuestions = async () => {
    if (!topic.trim()) {
      alert('Ingresá la consigna de la tarea original para generar las preguntas.');
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8080/api/evaluation/questions?originalAssignment=${encodeURIComponent(
          topic
        )}&questionCount=${questionCount}`,
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
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px', 
                  fontWeight: '500',
                }}
              >
                Texto del alumno:
              </label>

              <textarea
                value={studentText}
                onChange={(e) => setStudentText(e.target.value)}
                rows={6}
                placeholder="Pegá acá la resolución, explicación o trabajo del alumno..."
                style={{
                  width: '95%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  resize: 'vertical',
                  fontSize: '14px',
                }}
              />
            </div>
            
            <div style={{ flex: 1, marginBottom: '12px' }}>
              <label>Tarea original: </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ingrese la consigna de la tarea original"
                style={{
                  width: '95%',
                  padding: '10px',
                  marginTop: '6px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB'
                }}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label>Cantidad de preguntas: </label>
              <input
                type="number"
                min="3"
                max="10"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                style={{
                  width: '6%',
                  padding: '10px',
                  marginTop: '6px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB'
                }}
              />
            </div>

            <button
              onClick={generateQuestions}
              disabled={loading}
              style={{
                padding: '10px 16px',
                border: 'none',
                borderRadius: '8px',
                background: '#1D9E75',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Generando...' : 'Generar'}
            </button>

          </div>
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
            Completa el formulario y generá preguntas de comprensión.
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