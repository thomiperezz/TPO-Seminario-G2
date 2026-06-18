import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/global.css';

const RecuperarContrasena = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEnviado(true);
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
        maxWidth: '460px',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        position: 'relative',
        zIndex: 10,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            fontSize: '2rem',
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
          }}>
            Recuperá tu contraseña
          </p>
        </div>

        {!enviado ? (
          <form onSubmit={handleSubmit}>
            <div style={{
              marginBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--color-text)'
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresá tu correo electrónico"
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
                boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
              }}
            >
              Enviar instrucciones
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              Te enviamos un email a <strong>{email}</strong> con instrucciones para restablecer tu contraseña.
            </p>
            <button
              onClick={() => navigate('/login')}
              style={{
                width: '100%',
                padding: '0.9rem',
                backgroundColor: 'rgb(5, 150, 105)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Volver al login
            </button>
          </div>
        )}

        <button
          onClick={() => navigate('/login')}
          style={{
            marginTop: '1rem',
            background: 'none',
            border: 'none',
            color: 'rgb(5, 150, 105)',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ← Volver al inicio de sesión
        </button>
      </div>
    </div>
  );
};

export default RecuperarContrasena;
