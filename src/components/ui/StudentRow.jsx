import { useNavigate } from 'react-router-dom';
import Insignia from './Insignia';

const StudentRow = ({ alumno }) => {
  const navigate = useNavigate();

  return (
    <div>
        <div key={alumno.nombre} 
            style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '0.5px solid #eee' 
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: alumno.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: alumno.color,
                    flexShrink: 0 
                }}>
                    {alumno.iniciales}
                </div>
                <div>
                    <div style={{ fontSize: '13px', fontWeight: '500' }}>{alumno.nombre}</div>
                    <div style={{ fontSize: '11px', color: '#666' }}>
                        Última entrega {alumno.ultima} · {alumno.alertas > 0 ? `${alumno.alertas} 
                        notificacion${alumno.alertas > 1 ? 'es' : ''}` : '✅'}</div>
                </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Insignia texto={alumno.textoInsignia} tipo={alumno.tipo} />
                <button
                    onClick={() => navigate('/perfil-alumno')}
                    style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 10px',
                        borderRadius: '8px',
                        border: '0.5px solid #ccc',
                        background: '#fff',
                        fontSize: '12px',
                        cursor: 'pointer' 
                    }}
                >
                    Ver alumno
                </button>
            </div>
        </div>
    </div>
  );
};

export default StudentRow;