import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/global.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('uadeuser@hotmail.com');
  const [password, setPassword] = useState('uade123');
  const [recuerdame, setRecuerdame] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#F0F9FF',
      background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Elementos decorativos de fondo */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '300px',
        height: '300px',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-80px',
        width: '250px',
        height: '250px',
        backgroundColor: 'rgba(3, 102, 214, 0.1)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }} />

      <div style={{
        backgroundColor: 'var(--color-panel)',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
        padding: '3rem 2.5rem',
        width: '100%',
        maxWidth: '420px',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        position: 'relative',
        zIndex: 10,
        backdropFilter: 'blur(10px)'
      }}>
        {/* Logo y título */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--color-text)',
            marginBottom: '0.5rem'
          }}>
            <span style={{ color: 'rgb(5,150,105)' }}>acompaña</span>
            <span>educa</span>
          </div>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--color-text-secondary)',
            margin: 0,
            fontWeight: '500'
          }}>Bienvenido a tu panel de docente</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{
            marginBottom: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <label style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
               Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '0.85rem 1rem',
                border: '2px solid #E5E7EB',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-family)',
                transition: 'all 0.3s ease',
                outline: 'none',
                backgroundColor: '#F9FAFB'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgb(5, 150, 105)';
                e.target.style.backgroundColor = '#fff';
                e.target.style.boxShadow = '0 0 0 4px rgba(5, 150, 105, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB';
                e.target.style.backgroundColor = '#F9FAFB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Contraseña */}
          <div style={{
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <label style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
               Contraseña
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <input
                type={mostrarPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  paddingRight: '2.5rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-family)',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  backgroundColor: '#F9FAFB',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgb(5, 150, 105)';
                  e.target.style.backgroundColor = '#fff';
                  e.target.style.boxShadow = '0 0 0 4px rgba(5, 150, 105, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.backgroundColor = '#F9FAFB';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '4px'
                }}
              >
                {mostrarPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Recuérdame y Olvidé contraseña */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            fontSize: '0.875rem'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: 'var(--color-text)',
              fontWeight: '500'
            }}>
              <input
                type="checkbox"
                checked={recuerdame}
                onChange={(e) => setRecuerdame(e.target.checked)}
                style={{
                  cursor: 'pointer',
                  width: '16px',
                  height: '16px'
                }}
              />
              Recuérdame
            </label>
            <button
              type="button"
              onClick={() => alert('Función en desarrollo')}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgb(5, 150, 105)',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = 'none';
              }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Botón de ingreso */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.9rem',
              backgroundColor: 'rgb(5, 150, 105)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '1rem',
              boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgb(4, 120, 87)';
              e.target.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgb(5, 150, 105)';
              e.target.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.3)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ✓ Ingresar
          </button>
        </form>

        {/* Separador */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '1.5rem',
          opacity: 0.3
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
          <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>O</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
        </div>

        {/* Link a registro */}
        <div style={{
          backgroundColor: '#F9FAFB',
          borderRadius: '10px',
          padding: '1rem',
          textAlign: 'center',
          border: '1px solid #E5E7EB'
        }}>
          <p style={{
            margin: '0 0 0.5rem 0',
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)'
          }}>¿No tienes cuenta?</p>
          <button
            onClick={() => navigate('/registro')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgb(5, 150, 105)',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.95rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.fontSize = '1rem';
            }}
            onMouseLeave={(e) => {
              e.target.style.fontSize = '0.95rem';
            }}
          >
            Crear una nueva cuenta →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
