import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/global.css';

const Registro = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = true;
    if (!email.trim()) newErrors.email = true;
    if (!password.trim()) newErrors.password = true;
    if (!confirmPassword.trim()) newErrors.confirmPassword = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas deben coincidir');
      return;
    }

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
        maxWidth: '450px',
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
        }}>
          Crea tu cuenta para comenzar a gestionar tus cursos y actividades.
        </p>

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
            }}>Nombre completo:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
              }}
              placeholder="Tu nombre completo"
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.name ? '#dc2626' : '#D1D5DB'}`,
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-family)',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = errors.name ? '#dc2626' : 'var(--color-accent)';
                e.target.style.boxShadow = errors.name
                  ? '0 0 0 3px rgba(220, 38, 38, 0.1)'
                  : '0 0 0 3px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.name ? '#dc2626' : '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

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
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: false }));
              }}
              placeholder="ejemplo@correo.com"
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.email ? '#dc2626' : '#D1D5DB'}`,
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-family)',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = errors.email ? '#dc2626' : 'var(--color-accent)';
                e.target.style.boxShadow = errors.email
                  ? '0 0 0 3px rgba(220, 38, 38, 0.1)'
                  : '0 0 0 3px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? '#dc2626' : '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

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
            }}>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: false }));
              }}
              placeholder="********"
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.password ? '#dc2626' : '#D1D5DB'}`,
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-family)',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = errors.password ? '#dc2626' : 'var(--color-accent)';
                e.target.style.boxShadow = errors.password
                  ? '0 0 0 3px rgba(220, 38, 38, 0.1)'
                  : '0 0 0 3px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.password ? '#dc2626' : '#D1D5DB';
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
            }}>Confirmar contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: false }));
              }}
              placeholder="Repetí tu contraseña"
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.confirmPassword ? '#dc2626' : '#D1D5DB'}`,
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-family)',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = errors.confirmPassword ? '#dc2626' : 'var(--color-accent)';
                e.target.style.boxShadow = errors.confirmPassword
                  ? '0 0 0 3px rgba(220, 38, 38, 0.1)'
                  : '0 0 0 3px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.confirmPassword ? '#dc2626' : '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#059669',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Crear cuenta
          </button>
        </form>

        <p style={{
          marginTop: '1rem',
          fontSize: '0.9rem',
          textAlign: 'center',
          color: 'var(--color-text-secondary)'
        }}>
          ¿Ya tenés una cuenta?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{
              color: 'var(--color-primary)',
              cursor: 'pointer',
              fontWeight: '700'
            }}
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registro;
