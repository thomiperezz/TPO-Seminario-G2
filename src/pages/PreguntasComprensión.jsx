import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NavRuta from '../components/NavRuta';
import '../assets/styles/global.css';

/**
 * Página de Preguntas de Repaso
 * Muestra una lista de preguntas generadas por IA basadas en el trabajo del alumno.
 */
const PreguntasComprensión = () => {
  const navigate = useNavigate();

  // Datos hardcodeados según el requerimiento
  const questions = [
    {
      id: 1,
      category: 'Comprensión conceptual',
      question: '¿Qué es una variable y para qué se utiliza dentro de un programa?',
      description: 'Busca validar si el alumno comprende el concepto de almacenamiento de datos en memoria.'
    },
    {
      id: 2,
      category: 'Estructuras de control',
      question: '¿Cuál es la diferencia entre una estructura condicional if y un ciclo while?',
      description: 'Relacionada con el uso de decisiones y repeticiones dentro de un algoritmo.'
    },
    {
      id: 3,
      category: 'Tipos de datos',
      question: '¿Por qué es importante elegir correctamente el tipo de dato de una variable?',
      description: 'Permite evaluar si el alumno entiende la relación entre datos, operaciones y errores posibles.'
    },
    {
      id: 4,
      category: 'Funciones y modularización',
      question: '¿Qué ventaja tiene dividir un programa en funciones o métodos?',
      description: 'Busca que el alumno explique la importancia de organizar el código y evitar repeticiones.'
    },
    {
      id: 5,
      category: 'Resolución de problemas',
      question: 'Si tuvieras que calcular el promedio de tres notas, ¿qué pasos seguirías para resolverlo en un programa?',
      description: 'Pregunta orientada a evaluar pensamiento algorítmico básico y secuencia lógica de instrucciones.'
    }
  ];

  const handleExport = () => {
    console.log("Exportar preguntas");
    // Funcionalidad placeholder para el futuro
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', backgroundColor: 'var(--color-bg)' }}>

        {/* Header - Título y Acción */}
          <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.5rem 2rem',
                  backgroundColor: '#fff'
            }}>
          <h1 style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--color-text)'
          }}>
            Preguntas de Comprensión
          </h1>
          <button
            onClick={handleExport}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '7px 14px', 
              borderRadius: '8px', 
              border: 'none', 
              background: '#1D9E75', 
              color: '#fff', 
              fontSize: '13px', 
              cursor: 'pointer', 
              fontWeight: '500' 
            }}
          >
            <span style={{ fontSize: '16px' }}>↓</span> Exportar preguntas
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
            Preguntas generadas a partir del ensayo argumentativo. Podés usarlas en clase para validar la comprensión del alumno.
          </p>
        </div>
        <div style={{
            borderTop: '1px solid #E5E7EB',
            margin: '24px 0',
          }} />
        {/* Lista de Tarjetas de Preguntas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
          {questions.map((item) => (
            <div key={item.id} className="question-card" style={{ 
              background: '#FFFFFF', 
              border: '1px solid #E5E7EB', 
              borderRadius: '12px', 
              padding: '20px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                Pregunta {item.id} — {item.category}
              </div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#111827', marginBottom: '8px', lineHeight: '1.4' }}>
                {item.question}
              </div>
              <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PreguntasComprensión;