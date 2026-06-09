//Este es el rastro de navegación que aparece arriba de cada pantalla, por ejemplo: Cursos › 3° B Informática › Lucas Rodríguez › TP Algoritmos. 
// Al hacer clic en cualquier parte te lleva de vuelta.
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavRuta = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px',
      color: '#999',
      marginBottom: '20px',
      flexWrap: 'wrap',
    }}>
      {items.map((item, index) => {
        const esUltimo = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <span
              onClick={() => !esUltimo && item.ruta && navigate(item.ruta)}
              style={{
                cursor: esUltimo ? 'default' : 'pointer',
                color: esUltimo ? '#1a1a1a' : '#999',
                fontWeight: esUltimo ? '500' : '400',
              }}
              onMouseEnter={(e) => {
                if (!esUltimo) e.target.style.color = '#1D9E75';
              }}
              onMouseLeave={(e) => {
                if (!esUltimo) e.target.style.color = '#999';
              }}
            >
              {item.label}
            </span>
            {!esUltimo && <span style={{ color: '#ccc' }}>›</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NavRuta;