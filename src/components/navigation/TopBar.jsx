import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const publicRoutes = ['/', '/login', '/registro', '/recuperar-contrasena'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (publicRoutes.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0.6rem 1.2rem',
      background: '#fff',
      borderBottom: '1px solid #E5E7EB'
    }}>
      <div style={{ position: 'relative' }} ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.4rem 0.6rem',
            borderRadius: '999px'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0F9F6E 0%, #34D399 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '0.9rem'
          }}>
            MP
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: '700',
              color: '#111827'
            }}>
              Mi cuenta
            </div>
          </div>
          <span style={{ color: '#6B7280', fontSize: '0.85rem' }}>▼</span>
        </button>

        {menuOpen && (
          <div style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 0.4rem)',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.1)',
            minWidth: '150px',
            zIndex: 1000,
            overflow: 'hidden'
          }}>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                padding: '0.72rem 0.9rem',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#111827',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
            >
              Mi perfil
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                padding: '0.72rem 0.9rem',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#111827',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
            >
              Configuración
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                padding: '0.72rem 0.9rem',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#111827',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
            >
              Ayuda
            </button>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                padding: '0.72rem 0.9rem',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#DC2626',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
