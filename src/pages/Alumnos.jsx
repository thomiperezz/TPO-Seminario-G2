import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';

const todosLosAlumnos = [
  // 3° B — Informática
  { id: 1, nombre: 'Martina García', iniciales: 'MG', curso: '3° B', materia: 'Informática', ultima: 'hace 2h', estado: 'warning', insignia: '1 ⚠️' },
  { id: 2, nombre: 'Lucas Rodríguez', iniciales: 'LR', curso: '3° B', materia: 'Informática', ultima: 'hace 1 día', estado: 'error', insignia: '2 ❌' },
  { id: 3, nombre: 'Sofía Pérez', iniciales: 'SP', curso: '3° B', materia: 'Informática', ultima: 'hace 3h', estado: 'success', insignia: '✅' },
  { id: 4, nombre: 'Julián Méndez', iniciales: 'JM', curso: '3° B', materia: 'Informática', ultima: 'hace 3 días', estado: 'error', insignia: '3 ❌' },
  { id: 5, nombre: 'Camila Torres', iniciales: 'CT', curso: '3° B', materia: 'Informática', ultima: 'hace 5h', estado: 'success', insignia: '✅' },
  { id: 6, nombre: 'Nicolás Díaz', iniciales: 'ND', curso: '3° B', materia: 'Informática', ultima: 'hace 2 días', estado: 'warning', insignia: '1 ⚠️' },

  // 4° A — Programación
  { id: 7, nombre: 'Valentina López', iniciales: 'VL', curso: '4° A', materia: 'Programación', ultima: 'hace 1h', estado: 'success', insignia: '✅' },
  { id: 8, nombre: 'Tomás Romero', iniciales: 'TR', curso: '4° A', materia: 'Programación', ultima: 'hace 4h', estado: 'warning', insignia: '2 ⚠️' },
  { id: 9, nombre: 'Agustina Silva', iniciales: 'AS', curso: '4° A', materia: 'Programación', ultima: 'hace 2 días', estado: 'error', insignia: '1 ❌' },
  { id: 10, nombre: 'Mateo Fernández', iniciales: 'MF', curso: '4° A', materia: 'Programación', ultima: 'hace 6h', estado: 'success', insignia: '✅' },
  { id: 11, nombre: 'Lucía Martínez', iniciales: 'LM', curso: '4° A', materia: 'Programación', ultima: 'hace 1 día', estado: 'success', insignia: '✅' },
  { id: 12, nombre: 'Bruno Castro', iniciales: 'BC', curso: '4° A', materia: 'Programación', ultima: 'hace 3 días', estado: 'error', insignia: '2 ❌' },

  // 5° C — Matemática
  { id: 13, nombre: 'Isabella Moreno', iniciales: 'IM', curso: '5° C', materia: 'Matemática', ultima: 'hace 3h', estado: 'success', insignia: '✅' },
  { id: 14, nombre: 'Santiago Ruiz', iniciales: 'SR', curso: '5° C', materia: 'Matemática', ultima: 'hace 1 día', estado: 'warning', insignia: '1 ⚠️' },
  { id: 15, nombre: 'Florencia Herrera', iniciales: 'FH', curso: '5° C', materia: 'Matemática', ultima: 'hace 2h', estado: 'success', insignia: '✅' },
  { id: 16, nombre: 'Joaquín Vargas', iniciales: 'JV', curso: '5° C', materia: 'Matemática', ultima: 'hace 4 días', estado: 'error', insignia: '3 ❌' },
  { id: 17, nombre: 'Renata Acosta', iniciales: 'RA', curso: '5° C', materia: 'Matemática', ultima: 'hace 5h', estado: 'success', insignia: '✅' },

  // 6° A — Base de Datos
  { id: 18, nombre: 'Emilio Paredes', iniciales: 'EP', curso: '6° A', materia: 'Base de Datos', ultima: 'hace 1h', estado: 'success', insignia: '✅' },
  { id: 19, nombre: 'Antonella Ríos', iniciales: 'AR', curso: '6° A', materia: 'Base de Datos', ultima: 'hace 2 días', estado: 'warning', insignia: '1 ⚠️' },
  { id: 20, nombre: 'Facundo Blanco', iniciales: 'FB', curso: '6° A', materia: 'Base de Datos', ultima: 'hace 6h', estado: 'error', insignia: '1 ❌' },
  { id: 21, nombre: 'Milagros Soto', iniciales: 'MS', curso: '6° A', materia: 'Base de Datos', ultima: 'hace 3h', estado: 'success', insignia: '✅' },
  { id: 22, nombre: 'Rodrigo Peña', iniciales: 'RP', curso: '6° A', materia: 'Base de Datos', ultima: 'hace 1 día', estado: 'success', insignia: '✅' },
];

const estadoConfig = {
  success: { bg: '#DCFCE7', color: '#166534' },
  warning: { bg: '#FEF9C3', color: '#854D0E' },
  error: { bg: '#FEE2E2', color: '#B91C1C' },
};

const cursosUnicos = ['Todos', ...new Set(todosLosAlumnos.map((a) => a.curso))];

const Alumnos = () => {
  const navigate = useNavigate();
  const [filtroCurso, setFiltroCurso] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const alumnosFiltrados = todosLosAlumnos.filter((a) => {
    const coincideCurso = filtroCurso === 'Todos' || a.curso === filtroCurso;
    const coincideBusqueda = a.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCurso && coincideBusqueda;
  });

  return (
    <MainLayout>
      <Header
        title="Alumnos"
        subtitle="Listado general de alumnos por curso"
        breadcrumbs={[
          { label: 'Inicio', ruta: '/dashboard' },
          { label: 'Alumnos' }
        ]}
      />

      <div style={{ padding: '0 24px 24px' }}>
        {/* Filtros */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Buscar alumno..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              padding: '9px 14px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              fontSize: '13px',
              width: '220px'
            }}
          />
          {cursosUnicos.map((curso) => (
            <button
              key={curso}
              onClick={() => setFiltroCurso(curso)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: filtroCurso === curso ? 'none' : '1px solid #D1D5DB',
                background: filtroCurso === curso ? '#1D9E75' : '#fff',
                color: filtroCurso === curso ? '#fff' : '#111827',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {curso}
            </button>
          ))}
        </div>

        {/* Tabla */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                {['Alumno', 'Curso', 'Materia', 'Última actividad', 'Estado'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '2px solid #E5E7EB' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alumnosFiltrados.map((alumno) => {
                const cfg = estadoConfig[alumno.estado];
                return (
                  <tr
                    key={alumno.id}
                    style={{ borderBottom: '1px solid #F3F4F6', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '34px', height: '34px', borderRadius: '50%',
                          background: '#E0F2FE', color: '#0369A1',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '12px', fontWeight: '700'
                        }}>
                          {alumno.iniciales}
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{alumno.nombre}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#4B5563' }}>{alumno.curso}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#4B5563' }}>{alumno.materia}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6B7280' }}>{alumno.ultima}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '999px',
                        background: cfg.bg, color: cfg.color,
                        fontSize: '12px', fontWeight: '600'
                      }}>
                        {alumno.insignia}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {alumnosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
                    No se encontraron alumnos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '12px', fontSize: '12px', color: '#9CA3AF' }}>
          {alumnosFiltrados.length} alumno{alumnosFiltrados.length !== 1 ? 's' : ''} encontrado{alumnosFiltrados.length !== 1 ? 's' : ''}
        </div>
      </div>
    </MainLayout>
  );
};

export default Alumnos;