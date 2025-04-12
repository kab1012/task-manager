// src/components/GoogleLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase'; // Correct path

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const token = result.user.accessToken;
        localStorage.setItem('token', token);
        navigate('/tasks');
      })
      .catch((error) => {
        console.error('Google login error:', error);
      });
  };

  return (
    <button onClick={handleGoogleLogin} style={{ padding: '0.5rem 1rem', backgroundColor: '#DB4437', color: 'white', border: 'none', borderRadius: '5px' }}>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
