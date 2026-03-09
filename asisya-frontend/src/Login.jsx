import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api'; 

export const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/products');
      }
    } catch (err) {
      setError('Credenciales inválidas o error de conexión con la API.');
      console.error('Login error:', err);
    }
  };

  return (
    <div style={{ 
        position: 'fixed', 
        inset: 0, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#f3f4f6',
        margin: 0,
        padding: 0,
        zIndex: 999
    }}>
        <div style={{ 
            backgroundColor: 'white', 
            padding: '2.5rem', 
            borderRadius: '12px', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center'
        }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#1f2937', fontFamily: 'sans-serif' }}>
            Inicio de Sesión - Asisya
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={credentials.email}
            onChange={handleChange}
            required
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
            <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
            
            {error && <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{error}</p>}
            
            <button type="submit" style={{ 
                padding: '0.75rem', 
                cursor: 'pointer', 
                backgroundColor: '#2563eb', 
                color: 'white', 
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                transition: 'background-color 0.2s'
            }}>
            Ingresar
            </button>
        </form>
        </div>
    </div>
    );
};

export default Login;