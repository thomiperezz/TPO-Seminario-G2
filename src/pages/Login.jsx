import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/global.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('uadeuser@hotmail.com');
  const [password, setPassword] = useState('uade123');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navegar al dashboard
    navigate('/dashboard');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)'
    }}>
      <div style={{
        backgroundColor: 'var(--color-panel)',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #E5E7EB'
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          color: 'var(--color-text)',
          marginTop: 0,
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          <span style={{ color: 'rgb(5,150,105)' }}>acompaña</span>
          <span>educa</span>
        </h1>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          textAlign: 'center',
          marginBottom: '2rem',
          margin: '0 0 2rem 0'
        }}>Ingresa para acceder a tu panel</p>

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
            }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-family)',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-accent)';
                e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <label style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--color-text)'
            }}>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-family)',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-accent)';
                e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#059669';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--color-accent)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
