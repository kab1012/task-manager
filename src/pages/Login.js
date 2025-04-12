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
      <div style={{ margin: '1rem auto', textAlign: 'center', fontSize: '1.5em' }}>
        To Do App
      </div>
      <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center', padding: '1em', border: 'solid' }}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          style={{ width: '75%', padding: '0.5rem', marginBottom: '1rem' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={{ width: '75%', padding: '0.5rem', marginBottom: '1rem' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleLogin} style={{
          padding: '1rem 1.5rem', fontSize: '16px',
          fontWeight: '500', backgroundColor: '#DB4437', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
        }}>Login</button>

        <div style={{ padding: '0.5rem 1rem' }}><GoogleAuth /></div>
      </div>
    </>
  );
};

export default Login;
