import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NavRuta from '../components/NavRuta';
import Insignia from '../components/Insignia';

const PerfilAlumno = () => {
  const navigate = useNavigate();

  const entregas = [
    { titulo: 'TP — Algoritmos de ordenamiento', meta: 'Entregado · 2 versiones · 2 alertas', tipo: 'rojo', insignia: '2 alertas' },
    { titulo: 'Parcial — Estructuras de control', meta: 'Entregado · 1 versión · 3 alertas', tipo: 'rojo', insignia: '3 alertas' },
    { titulo: 'TP grupal — Proyecto web básico', meta: 'En proceso · 1 versión · Sin alertas', tipo: 'gris', insignia: 'En proceso' },
  ];

  const evolucion = [
    { fecha: 'Mayo 2026 · TP Algoritmos', texto: 'Código funcional pero sin comentarios. Explicación copiada de fuente externa. 2 alertas.', activo: true },
    { fecha: 'Abril 2026 · Parcial estructuras de control', texto: 'Confunde bucles for y while. Usa estructuras complejas sin justificar. 3 alertas.', activo: true },
    { fecha: 'Marzo 2026 · Primer TP', texto: 'Buen desempeño inicial. Código simple pero correcto. Sin alertas.', activo: false },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', backgroundColor: 'var(--color-bg)' }}>
        <NavRuta items={[
          { label: 'Cursos', ruta: '/course' },
          { label: '3° B — Informática', ruta: '/detalle-curso' },
          { label: 'Lucas Rodríguez' },
        ]} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>Lucas Rodríguez</h1>
          <button
            onClick={() => navigate('/correccion-asistida')}
            style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', background: '#1D9E75', color: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}
          >
            ✏ Ir a corrección
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Actividades entregadas', value: '6', sub: 'de 8 asignadas' },
            { label: 'Alertas totales', value: '5', sub: 'En todo el período', valueColor: '#A32D2D' },
            { label: 'Promedio de versiones', value: '2.1', sub: 'Por trabajo entregado' },
            { label: 'Última actividad', value: 'Hace 1 día', sub: 'TP Algoritmos', valueFontSize: '14px' },
          ].map((card) => (
            <div key={card.label} style={{ background: '#f5f5f3', borderRadius: '8px', padding: '14px 16px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px' }}>{card.label}</div>
              <div style={{ fontSize: card.valueFontSize || '22px', fontWeight: '500', color: card.valueColor || '#1a1a1a' }}>{card.value}</div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>Entregas del alumno</div>
            {entregas.map((entrega) => (
              <div
                key={entrega.titulo}
                onClick={() => navigate('/seguimiento-entrega')}
                style={{ background: '#fff', border: '0.5px solid #ddd', borderRadius: '12px', padding: '16px 20px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{entrega.titulo}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '3px' }}>{entrega.meta}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Insignia texto={entrega.insignia} tipo={entrega.tipo} />
                  <span style={{ color: '#999', fontSize: '14px' }}>›</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>Evolución a lo largo del tiempo</div>
            <div style={{ position: 'relative', paddingLeft: '20px' }}>
              <div style={{ position: 'absolute', left: '6px', top: '8px', bottom: '8px', width: '1px', background: '#ddd' }} />
              {evolucion.map((item) => (
                <div key={item.fecha} style={{ position: 'relative', marginBottom: '20px' }}>
                  <div style={{ position: 'absolute', left: '-17px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: item.activo ? '#1D9E75' : '#ccc', border: '2px solid #fff' }} />
                  <div style={{ background: '#f5f5f3', borderRadius: '8px', padding: '10px 14px' }}>
                    <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>{item.fecha}</div>
                    <div style={{ fontSize: '13px', color: '#1a1a1a' }}>{item.texto}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerfilAlumno;