//import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Sidebar from '../components/navigation/Sidebar';
import NavRuta from '../components/navigation/NavRuta';
import TarjetaAlerta from '../components/ui/CardAlert';
import Insignia from '../components/ui/Insignia';
import StatCard from '../components/ui/StatCard';
import StudentRow from '../components/ui/StudentRow';
import DifficultyChart from '../components/ui/DifficultyChart';
import SectionHeader from '../components/ui/SectionHeader';
import DetectedPatterns from '../components/course/DetectedPatterns';

const DetalleCurso = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const course = location.state?.course || {
    code: '3° B',
    name: 'Informática',
    info: '32 alumnos',
    alerts: '6 ⚠️',
    alertType: 'warning'
  };

  const courseLabel = `${course.code} — ${course.name}`;

  const alumnos = [
    { iniciales: 'MG', nombre: 'Martina García', ultima: 'hace 2h', alertas: 1, tipo: 'amarillo', textoInsignia: '1 ⚠️', bg: '#E6F1FB', color: '#185FA5' },
    { iniciales: 'LR', nombre: 'Lucas Rodríguez', ultima: 'hace 1 día', alertas: 2, tipo: 'rojo', textoInsignia: '2 ❌', bg: '#FAEEDA', color: '#854F0B' },
    { iniciales: 'SP', nombre: 'Sofía Pérez', ultima: 'hace 3h', alertas: 0, tipo: 'verde', textoInsignia: '✅', bg: '#FBEAF0', color: '#993556' },
    { iniciales: 'JM', nombre: 'Julián Méndez', ultima: 'hace 3 días', alertas: 3, tipo: 'rojo', textoInsignia: '3 ❌', bg: '#EEEDFE', color: '#534AB7' },
  ];

  const dificultades = [
    { label: 'Estructuras de control (if/else/for)', pct: 68, color: '#F09595' },
    { label: 'Funciones y parámetros', pct: 52, color: '#FAC775' },
    { label: 'Depuración de errores', pct: 44, color: '#FAC775' },
    { label: 'Variables y tipos de datos', pct: 28, color: '#5DCAA5' },
  ];

  const [aprobaciones] = useState([
    { nombre: 'Martina García', entrega: 'TP — Algoritmos de ordenamiento', estado: 'Aprobado', observacion: 'Buen uso de estructuras y comentarios.' },
    { nombre: 'Lucas Rodríguez', entrega: 'Parcial — Estructuras de control', estado: 'Revisión', observacion: 'Faltan ejemplos de if/else en las respuestas.' },
    { nombre: 'Sofía Pérez', entrega: 'TP grupal — Proyecto web básico', estado: 'Aprobado', observacion: 'Código limpio y bien organizado.' },
    { nombre: 'Julián Méndez', entrega: 'Ejercicio de funciones', estado: 'Reprobado', observacion: 'Error en la lógica de retorno de funciones.' },
  ]);

  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const filtrado = filtroEstado === 'Todos' 
    ? aprobaciones 
    : aprobaciones.filter(item => item.estado === filtroEstado);

  const contadores = {
    Todos: aprobaciones.length,
    Aprobado: aprobaciones.filter(i => i.estado === 'Aprobado').length,
    Revisión: aprobaciones.filter(i => i.estado === 'Revisión').length,
    Reprobado: aprobaciones.filter(i => i.estado === 'Reprobado').length,
  };

  return (
    <div className='course-detail-layout'>
      <Sidebar />
      <main className='course-detail-main'>
        <NavRuta items={[
          { label: 'Cursos', ruta: '/course' },
          { label: courseLabel },
        ]} />

        <div className='course-detail-header'>
          <h1 className='course-detail-title'>{courseLabel}</h1>
          <button
            onClick={() => navigate('/nueva-actividad')}
            className='new-activity-btn'
          >
            + Nueva actividad
          </button>
        </div>

        <div className="stats-grid">
          {[
            { title: 'Alumnos', value: '32', description: '2 sin entregas recientes' },
            { title: 'Actividades activas', value: '3', description: '1 con entrega esta semana' },
            { title: 'Notificaciones pedagógicas', value: '6', description: 'En entregas recientes' },
            { title: 'Nivel de comprensión', value: '61%', description: 'Promedio del curso' },
          ].map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              description={card.description}
            />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div>
            <SectionHeader>Métricas del curso</SectionHeader>
            <div className='card'>
              <DifficultyChart items={dificultades} />
            </div>
          </div>
            <div>
              <DetectedPatterns />
            </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>Actividades de Curso</div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
            {['Todos', 'Aprobado', 'Revisión', 'Reprobado'].map((estado) => (
              <button
                key={estado}
                onClick={() => setFiltroEstado(estado)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: filtroEstado === estado ? 'none' : '1px solid #D1D5DB',
                  background: filtroEstado === estado ? '#1D9E75' : '#fff',
                  color: filtroEstado === estado ? '#fff' : '#111827',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {estado} ({contadores[estado]})
              </button>
            ))}
          </div>

          {filtrado.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                <thead>
                  <tr>
                    {['Alumno', 'Entrega', 'Estado', 'Observación'].map((header) => (
                      <th key={header} style={{ textAlign: 'left', padding: '12px 14px', fontSize: '12px', fontWeight: '600', color: '#6B7280', borderBottom: '2px solid #E5E7EB', background: '#F9FAFB' }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtrado.map((item) => (
                    <tr key={item.nombre + item.entrega} style={{ borderBottom: '1px solid #F3F4F6', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
                      <td style={{ padding: '14px', fontSize: '13px', fontWeight: '500', color: '#111827' }}>{item.nombre}</td>
                      <td style={{ padding: '14px', fontSize: '13px', color: '#4B5563' }}>{item.entrega}</td>
                      <td style={{ padding: '14px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 10px',
                          borderRadius: '999px',
                          background: item.estado === 'Aprobado' ? '#DCFCE7' : item.estado === 'Reprobado' ? '#FEE2E2' : '#DBEAFE',
                          color: item.estado === 'Aprobado' ? '#166534' : item.estado === 'Reprobado' ? '#B91C1C' : '#1E40AF',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}>
                          {item.estado === 'Aprobado' && '✓'} {item.estado === 'Reprobado' && '✕'} {item.estado}
                        </span>
                      </td>
                      <td style={{ padding: '14px', fontSize: '13px', color: '#6B7280' }}>{item.observacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6B7280' }}>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>No hay entregas con estado "{filtroEstado}"</div>
              <div style={{ fontSize: '12px', color: '#999' }}>Selecciona otro filtro para verlas.</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DetalleCurso;