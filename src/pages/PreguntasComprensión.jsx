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
    console.log("Exportar preguntas");
    // Funcionalidad placeholder para el futuro
  };

  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    if (!topic.trim()) {
      alert('Ingresá un tema');
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        'http://localhost:8080/api/evaluation/questions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify({
            originalAssigment: topic,
            questionCount,
          }),
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

            <div style={{ flex: 1, marginBottom: '12px' }}>
              <label>Tema: </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ingrese un prompt sobre un tema de matemática "
                style={{
                  width: '90%',
                  padding: '10px',
                  marginTop: '6px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB'
                }}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label>Cantidad: </label>
              <input
                type="number"
                min="1"
                max="20"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                style={{
                  width: '10%',
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
            Preguntas generadas a partir del ensayo argumentativo. Podés usarlas en clase para validar la comprensión del alumno.
          </p>
        </div>
        <div style={{
            borderTop: '1px solid #E5E7EB',
            margin: '24px 0',
          }} />
        {/* Lista de Tarjetas de Preguntas */}
        {!loading && questions.length === 0 && (
          <div
            style={{
              background: '#fff',
              border: '1px dashed #D1D5DB',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              color: '#6B7280'
            }}
          >
            Ingresá un tema de matemática y generá preguntas.
          </div>
        )}
        {loading && (
          <div
            style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}
          >
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