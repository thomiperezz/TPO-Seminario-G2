//import React from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className='course-detail-layout'>
      <Sidebar />
      <main className='course-detail-main'>
        <NavRuta items={[
          { label: 'Cursos', ruta: '/course' },
          { label: '3° B — Matemática' },
        ]} />

        <div className='course-detail-header'>
          <h1 className='course-detail-title'>3° B — Matemática</h1>
          <button
            onClick={() => navigate('/nueva-actividad')}
            className='new-activity-btn'
          >
            + Nueva actividad
          </button>
        </div>

        <div className="stats-grid">
          {[
            { title: 'Alumnos', value: '28', description: '2 sin entregas recientes' },
            { title: 'Actividades activas', value: '3', description: '1 con entrega esta semana' },
            { title: 'Alertas pedagógicas', value: '6', description: 'En entregas recientes' },
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

        <SectionHeader>Alumnos</SectionHeader>
        <div className='card'>
          {alumnos.map((alumno) => (
            <StudentRow
              key={alumno.nombre}
              alumno={alumno}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DetalleCurso;