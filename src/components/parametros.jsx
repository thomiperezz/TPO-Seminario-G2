//es la ventana que aparece encima de la pantalla de corrección asistida cuando el docente hace clic en "Editar parámetros".
import React, { useState } from 'react';
import Toggle from './Toggle';

const ModalParametros = ({ visible, onCerrar, parametrosIniciales }) => {
  const [parametros, setParametros] = useState(parametrosIniciales || {
    codigoCopiado: true,
    explicacionesGenericas: true,
    erroresConceptuales: true,
    cambiosComplejidad: true,
    preguntasAutomaticas: false,
  });

  const [umbral, setUmbral] = useState(2);
  const etiquetasUmbral = ['Bajo', 'Moderado', 'Alto'];

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.35)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        border: '0.5px solid #ddd',
        padding: '24px',
        width: '480px',
        maxWidth: '90%',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ fontSize: '16px', fontWeight: '500' }}>Editar parámetros de corrección</div>
          <button onClick={onCerrar} style={{ border: '0.5px solid #ccc', background: '#fff', borderRadius: '8px', padding: '5px 10px', cursor: 'pointer', fontSize: '12px' }}>✕</button>
        </div>

        <div style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
          Estos parámetros aplican solo a esta entrega. Los cambios no afectan otras actividades del curso.
        </div>

        {[
          { key: 'codigoCopiado', label: 'Código copiado sin modificaciones', sub: 'Señala fragmentos idénticos a fuentes externas o entre alumnos' },
          { key: 'explicacionesGenericas', label: 'Explicaciones genéricas', sub: 'Alerta cuando la justificación carece de especificidad técnica' },
          { key: 'erroresConceptuales', label: 'Errores conceptuales', sub: 'Compara con conceptos esperados para el nivel' },
          { key: 'cambiosComplejidad', label: 'Cambios abruptos de complejidad', sub: 'Señala inconsistencias en el nivel técnico del trabajo' },
          { key: 'preguntasAutomaticas', label: 'Generar preguntas automáticamente', sub: 'Crea preguntas a partir de esta entrega al recibirla' },
        ].map((param, i, arr) => (
          <div key={param.key} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: i < arr.length - 1 ? '0.5px solid #ddd' : 'none',
          }}>
            <div>
              <div style={{ fontSize: '13px', color: '#1a1a1a' }}>{param.label}</div>
              <div style={{ fontSize: '11px', color: '#999' }}>{param.sub}</div>
            </div>
            <Toggle
              inicial={parametros[param.key]}
              onChange={(valor) => setParametros(prev => ({ ...prev, [param.key]: valor }))}
            />
          </div>
        ))}

        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '0.5px solid #ddd' }}>
          <div style={{ fontSize: '12px', fontWeight: '500', color: '#1a1a1a', marginBottom: '10px' }}>Sensibilidad de detección</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: '#666', width: '160px' }}>Umbral de alerta</span>
            <input
              type="range"
              min="1" max="3"
              value={umbral}
              onChange={(e) => setUmbral(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontSize: '12px', color: '#1a1a1a', minWidth: '60px' }}>
              {etiquetasUmbral[umbral - 1]}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button onClick={onCerrar} style={{ border: '0.5px solid #ccc', background: '#fff', borderRadius: '8px', padding: '7px 14px', cursor: 'pointer', fontSize: '13px' }}>Cancelar</button>
          <button onClick={onCerrar} style={{ border: 'none', background: '#1D9E75', color: '#fff', borderRadius: '8px', padding: '7px 14px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>✓ Guardar cambios</button>
        </div>
      </div>
    </div>
  );
};

export default ModalParametros;