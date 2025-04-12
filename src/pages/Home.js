
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to the Task Manager</h2>
      <p>Use the sidebar to view or add tasks.</p>
    </div>
  );
};
