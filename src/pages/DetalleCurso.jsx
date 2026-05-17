//import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NavRuta from '../components/NavRuta';
import TarjetaAlerta from '../components/CardAlert';
import Insignia from '../components/Insignia';

const DetalleCurso = () => {
  const navigate = useNavigate();

  const alumnos = [
    { iniciales: 'MG', nombre: 'Martina García', ultima: 'hace 2h', alertas: 1, tipo: 'amarillo', textoInsignia: '1 alerta', bg: '#E6F1FB', color: '#185FA5' },
    { iniciales: 'LR', nombre: 'Lucas Rodríguez', ultima: 'hace 1 día', alertas: 2, tipo: 'rojo', textoInsignia: '2 alertas', bg: '#FAEEDA', color: '#854F0B' },
    { iniciales: 'SP', nombre: 'Sofía Pérez', ultima: 'hace 3h', alertas: 0, tipo: 'verde', textoInsignia: 'Sin alertas', bg: '#FBEAF0', color: '#993556' },
    { iniciales: 'JM', nombre: 'Julián Méndez', ultima: 'hace 3 días', alertas: 3, tipo: 'rojo', textoInsignia: '3 alertas', bg: '#EEEDFE', color: '#534AB7' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', backgroundColor: 'var(--color-bg)' }}>
        <NavRuta items={[
          { label: 'Cursos', ruta: '/course' },
          { label: '3° B — Informática' },
        ]} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>3° B — Informática</h1>
          <button
            onClick={() => navigate('/nueva-actividad')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', border: 'none', background: '#1D9E75', color: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}
          >
            + Nueva actividad
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Alumnos', value: '28', sub: '2 sin entregas recientes' },
            { label: 'Actividades activas', value: '3', sub: '1 con entrega esta semana' },
            { label: 'Alertas pedagógicas', value: '6', sub: 'En entregas recientes' },
            { label: 'Nivel de comprensión', value: '61%', sub: 'Promedio del curso' },
          ].map((card) => (
            <div key={card.label} style={{ background: '#f5f5f3', borderRadius: '8px', padding: '14px 16px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px' }}>{card.label}</div>
              <div style={{ fontSize: '22px', fontWeight: '500' }}>{card.value}</div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>Métricas del curso</div>
            <div style={{ background: '#f5f5f3', borderRadius: '12px', padding: '16px 20px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>Conceptos con mayor dificultad</div>
              {[
                { label: 'Estructuras de control (if/else/for)', pct: 68, color: '#F09595' },
                { label: 'Funciones y parámetros', pct: 52, color: '#FAC775' },
                { label: 'Depuración de errores', pct: 44, color: '#FAC775' },
                { label: 'Variables y tipos de datos', pct: 28, color: '#5DCAA5' },
              ].map((barra) => (
                <div key={barra.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ fontSize: '12px', color: '#444', width: '200px', flexShrink: 0 }}>{barra.label}</div>
                  <div style={{ flex: 1, height: '8px', background: '#eee', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${barra.pct}%`, height: '100%', background: barra.color, borderRadius: '999px' }} />
                  </div>
                  <span style={{ fontSize: '11px', color: '#999' }}>{barra.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>Patrones detectados</div>
            <TarjetaAlerta tipo="rojo" titulo="Código sin comentarios ni justificación" descripcion="Presente en 11 de 22 trabajos revisados." />
            <TarjetaAlerta tipo="amarillo" titulo="Soluciones idénticas entre alumnos" descripcion="4 trabajos comparten la misma lógica de resolución." />
            <TarjetaAlerta tipo="azul" titulo="Oportunidad de clase" descripcion="Las estructuras de control siguen siendo el mayor punto de confusión." />
          </div>
        </div>

        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>Alumnos</div>
        <div style={{ background: '#fff', border: '0.5px solid #ddd', borderRadius: '12px', padding: '0 20px' }}>
          {alumnos.map((alumno, i) => (
            <div key={alumno.nombre} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < alumnos.length - 1 ? '0.5px solid #eee' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: alumno.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '500', color: alumno.color, flexShrink: 0 }}>
                  {alumno.iniciales}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500' }}>{alumno.nombre}</div>
                  <div style={{ fontSize: '11px', color: '#666' }}>Última entrega {alumno.ultima} · {alumno.alertas > 0 ? `${alumno.alertas} alerta${alumno.alertas > 1 ? 's' : ''}` : 'Sin alertas'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Insignia texto={alumno.textoInsignia} tipo={alumno.tipo} />
                <button
                  onClick={() => navigate('/perfil-alumno')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '8px', border: '0.5px solid #ccc', background: '#fff', fontSize: '12px', cursor: 'pointer' }}
                >
                  Ver alumno
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DetalleCurso;