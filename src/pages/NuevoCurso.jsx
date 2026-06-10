import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import NavRuta from '../components/navigation/NavRuta';
import ToggleSwitch from '../components/ui/ToggleSwitch';

const NuevoCurso = () => {
  const navigate = useNavigate();
  const [parametros, setParametros] = useState({
    codigoCopiado: true,
    explicacionesGenericas: true,
    erroresConceptuales: true,
    cambiosComplejidad: true,
    preguntasAutomaticas: false,
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', backgroundColor: 'var(--color-bg)' }}>
        <NavRuta items={[
          { label: 'Cursos', ruta: '/course' },
          { label: 'Nuevo curso' },
        ]} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>Nuevo curso</h1>
        </div>
        <div style={{ maxWidth: '620px' }}>
          <div style={{ background: '#f5f5f3', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '14px' }}>Información del curso</div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: '500' }}>Nombre del curso</label>
              <input style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #ccc', fontSize: '13px', boxSizing: 'border-box' }} placeholder="Ej: 3° B — Informática" />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: '500' }}>Materia</label>
              <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #ccc', fontSize: '13px' }}>
                <option>Informática</option>
                <option>Tecnologías de la Información</option>
                <option>Programación</option>
                <option>Robótica</option>
                <option>Otra</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: '500' }}>Año</label>
                <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #ccc', fontSize: '13px' }}>
                  <option>1°</option><option>2°</option><option selected>3°</option><option>4°</option><option>5°</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: '500' }}>División</label>
                <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #ccc', fontSize: '13px' }}>
                  <option>A</option><option selected>B</option><option>C</option><option>D</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: '500' }}>Turno</label>
              <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #ccc', fontSize: '13px' }}>
                <option>Mañana</option><option>Tarde</option><option>Noche</option>
              </select>
            </div>
          </div>

          <div style={{ background: '#f5f5f3', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Parámetros de corrección por defecto</div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '14px' }}>Se aplicarán a todas las entregas del curso. Podés modificarlos por actividad.</div>
            {[
              { key: 'codigoCopiado', label: 'Detectar código copiado sin modificaciones', sub: 'Señala fragmentos idénticos a fuentes externas o entre alumnos' },
              { key: 'explicacionesGenericas', label: 'Identificar explicaciones genéricas', sub: 'Notifica cuando la justificación carece de especificidad técnica' },
              { key: 'erroresConceptuales', label: 'Detectar errores conceptuales', sub: 'Compara con conceptos esperados para el nivel' },
              { key: 'cambiosComplejidad', label: 'Detectar cambios abruptos de complejidad', sub: 'Señala inconsistencias en el nivel técnico del trabajo' },
              { key: 'preguntasAutomaticas', label: 'Generar preguntas de repaso automáticamente', sub: 'Crea preguntas a partir de cada entrega recibida' },
            ].map((param, i, arr) => (
              <div key={param.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? '0.5px solid #ddd' : 'none' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#1a1a1a' }}>{param.label}</div>
                  <div style={{ fontSize: '11px', color: '#999' }}>{param.sub}</div>
                </div>
                <ToggleSwitch
                  checked={parametros[param.key]}
                  onChange={(valor) => setParametros(prev => ({ ...prev, [param.key]: valor }))}
                />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => navigate('/course')} style={{ padding: '7px 14px', borderRadius: '8px', border: '0.5px solid #ccc', background: '#fff', fontSize: '13px', cursor: 'pointer' }}>Cancelar</button>
            <button onClick={() => navigate('/course')} style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', background: '#1D9E75', color: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>✓ Crear curso</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NuevoCurso;