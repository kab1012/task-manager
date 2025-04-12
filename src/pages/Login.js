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
    <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin} style={{ padding: '0.5rem 1rem' }}>Login</button>

      {/* <GoogleAuth /> */}
    </div>
  );
};

export default Login;
