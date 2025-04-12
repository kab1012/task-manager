// src/components/GoogleLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase'; // Correct path
import backend_domain from '../helpers/api.ts';
import axios from 'axios';
const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const token = result.user.accessToken;
        const uid = result.user.uid;
        const name = result.user.displayName;
        const email = result.user.email;

        // Save token locally
        localStorage.setItem('token', token);

        // Send user data to backend
        try {

          const response = await axios.post(`${backend_domain}/api/users/google-auth`, { uid, name, email });
          // await fetch(`${backend_domain}/api/users/google-auth`, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     uid,
          //     name,
          //     email,
          //   }),
          // });
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('user_id', response.data.user.id);

          // After updating/creating user, navigate
          navigate('/tasks');
        } catch (err) {
          console.error('Error saving user to backend:', err);
        }
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
