//Este es el interruptor de on/off que usás en la pantalla de parámetros de corrección — el que activa y desactiva cada criterio 
// como "Detectar código copiado", "Explicaciones genéricas", etc.
import { useState } from 'react';
const Toggle = ({ inicial = true, onChange }) => {
  const [activo, setActivo] = useState(inicial);

  const cambiar = () => {
    const nuevo = !activo;
    setActivo(nuevo);
    if (onChange) onChange(nuevo);
  };

  return (
    <div
      onClick={cambiar}
      style={{
        width: '36px',
        height: '20px',
        borderRadius: '999px',
        background: activo ? '#1D9E75' : '#ccc',
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 0.2s',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '3px',
        left: activo ? '19px' : '3px',
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        background: '#fff',
        transition: 'left 0.2s',
      }} />
    </div>
  );
};

export default Toggle;