//es el bloque de alerta pedagógica que aparece en el Dashboard y en el detalle del curso — por ejemplo "Código copiado sin modificaciones · Julián Méndez · 3° B".
import React from 'react';

const colores = {
  rojo: { background: '#FCEBEB', color: '#A32D2D' },
  amarillo: { background: '#FAEEDA', color: '#854F0B' },
  azul: { background: '#E6F1FB', color: '#185FA5' },
};

const iconos = {
  rojo: '⚠️',
  amarillo: '🔔',
  azul: 'ℹ️',
};

const TarjetaAlerta = ({ titulo, descripcion, tipo = 'azul', icono }) => {
  const estilo = colores[tipo] || colores.azul;
  const iconoMostrar = icono || iconos[tipo];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '14px 18px',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      background: '#fff',
      marginBottom: '8px',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        flexShrink: 0,
        background: estilo.background,
        color: estilo.color,
      }}>
        {iconoMostrar}
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: '500', color: '#1a1a1a', marginBottom: '2px' }}>
          {titulo}
        </div>
        <div style={{ fontSize: '11px', color: '#666' }}>
          {descripcion}
        </div>
      </div>
    </div>
  );
};

export default TarjetaAlerta;