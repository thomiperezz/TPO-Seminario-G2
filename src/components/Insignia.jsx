//Las insignias de colores que aparecen al lado de cada curso o alumno, como "6 alertas" en amarillo, "Sin alertas" en verde, "3 alertas" en azul, "En proceso" en gris.
import React from 'react';

const tipos = {
  verde: { background: '#E1F5EE', color: '#0F6E56' },
  amarillo: { background: '#FAEEDA', color: '#854F0B' },
  rojo: { background: '#FCEBEB', color: '#A32D2D' },
  azul: { background: '#E6F1FB', color: '#185FA5' },
  gris: { background: '#F1EFE8', color: '#5F5E5A' },
};

const Insignia = ({ texto, tipo = 'gris' }) => {
  const estilo = tipos[tipo] || tipos.gris;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 9px',
      borderRadius: '999px',
      fontSize: '11px',
      fontWeight: '500',
      background: estilo.background,
      color: estilo.color,
    }}>
      {texto}
    </span>
  );
};

export default Insignia;