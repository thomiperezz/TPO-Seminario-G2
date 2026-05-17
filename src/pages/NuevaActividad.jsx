import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NavRuta from '../components/NavRuta';
import Toggle from '../components/toggle';

const NuevaActividad = () => {
  const navigate = useNavigate();
  const [parametros, setParametros] = useState({
    codigoCopiado: true,
    explicacionesGenericas: true,
    erroresConceptuales: true,
    cambiosComplejidad: true,
    preguntasAutomaticas: true,
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', backgroundColor: 'var(--color-bg)' }}>
        <NavRuta items={[
          { label: 'Cursos', ruta: '/course' },
          { label: '3° B — Informática', ruta: '/detalle-curso' },
          { label: 'Nueva actividad' },
        ]} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>Nueva actividad</h1>
        </div>
        <div style={{ maxWidth: '620px' }}>
          <div style={{ background: '#f5f5f3', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '14px' }}>Información de la actividad</div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: '500' }}>Nombre de la actividad</label>
              <input style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #ccc', fontSize: '13px', boxSizing: 'border-box' }} placeholder="Ej: TP — Algoritmos de ordenamiento" />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: '500' }}>Consigna</label>
              <textarea style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #ccc', fontSize: '13px', height: '80px', boxSizing: 'border-box', resize: 'vertical' }} placeholder="Describí qué deben hacer los alumnos..." />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: '500' }}>Fecha de entrega</label>
                <input type="date" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #ccc', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: '500' }}>Tipo de entrega</label>
                <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #ccc', fontSize: '13px' }}>
                  <option>Individual</option>
                  <option>Grupal</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: '500' }}>Lenguaje o herramienta</label>
              <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #ccc', fontSize: '13px' }}>
                <option>Python</option>
                <option>Scratch</option>
                <option>JavaScript</option>
                <option>HTML/CSS</option>
                <option>Pseudocódigo</option>
                <option>Otro</option>
              </select>
            </div>
          </div>

          <div style={{ background: '#f5f5f3', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Parámetros de corrección para esta actividad</div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '14px' }}>Heredados del curso. Podés ajustarlos para esta actividad específica.</div>
            {[
              { key: 'codigoCopiado', label: 'Detectar código copiado sin modificaciones', sub: 'Señala fragmentos idénticos a fuentes externas o entre alumnos' },
              { key: 'explicacionesGenericas', label: 'Identificar explicaciones genéricas', sub: 'Alerta cuando la justificación carece de especificidad técnica' },
              { key: 'erroresConceptuales', label: 'Detectar errores conceptuales', sub: 'Compara con conceptos esperados para el nivel' },
              { key: 'cambiosComplejidad', label: 'Detectar cambios abruptos de complejidad', sub: 'Señala inconsistencias en el nivel técnico del trabajo' },
              { key: 'preguntasAutomaticas', label: 'Generar preguntas de repaso automáticamente', sub: 'Crea preguntas a partir de cada entrega recibida' },
            ].map((param, i, arr) => (
              <div key={param.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? '0.5px solid #ddd' : 'none' }}>
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
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => navigate('/detalle-curso')} style={{ padding: '7px 14px', borderRadius: '8px', border: '0.5px solid #ccc', background: '#fff', fontSize: '13px', cursor: 'pointer' }}>Cancelar</button>
            <button onClick={() => navigate('/detalle-curso')} style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', background: '#1D9E75', color: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>✓ Crear actividad</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NuevaActividad;