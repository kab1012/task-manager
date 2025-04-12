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
    // <button onClick={handleGoogleLogin} style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: 'black', border: 'solid', borderRadius: '5px' }}>
    //   Sign in with Google
    // </button>
    <div
      onClick={handleGoogleLogin}
      style={{

        height: '50px',
        color: 'black',
        fontSize: '16px',
        fontWeight: '500',
        border: 'none',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        transition: 'background-color 0.3s ease'
      }}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google Logo"
        style={{ width: '20px', height: '20px',padding:'0.2em 1em', }}
      />
      Sign in with Google
    </div>
  );
};

export default GoogleLogin;
