import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backend_domain from '../helpers/api.ts';

import GoogleAuth from '../components/GoogleLogin.js'; // import the GoogleAuth component

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Make API request to login
      const response = await axios.post(`${backend_domain}/api/login`, { email, password });

      // Store the token in localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user_id', response.data.user.id);

      // Redirect to the tasks page
      navigate('/tasks');
    } catch (err) {
      // Handle login errors
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred during login');
      }
    }
  };

  return (
    <>
      <div style={{
        margin: '2rem auto',
        textAlign: 'center',
        fontSize: '1.5em',
        fontWeight: '600',
        color: '#1f2937'
      }}>
        To Do App
      </div>
      <div style={{
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          color: '#2563eb',
          marginBottom: '1.5rem',
        }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={(e) => e.target.style.borderColor = '#2563eb'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={(e) => e.target.style.borderColor = '#2563eb'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />

        {error && <p style={{ color: '#e11d48', fontSize: '1rem', marginBottom: '1rem' }}>{error}</p>}

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: '#DB4437',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c1351d'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#DB4437'}
        >
          Login
        </button>

        <div style={{ padding: '1rem 0' }}>
          <GoogleAuth />
        </div>
      </div>
    </>
  );
};

export default Login;
