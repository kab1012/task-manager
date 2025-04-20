import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import backend_domain from '../helpers/api.ts';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user_id = localStorage?.getItem('user_id');

  useEffect(() => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day
    const formattedDate = tomorrow.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    setDueDate(formattedDate); // Set as default due date

  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${backend_domain}/api/tasks`, {
        tasks: title,
        status: 'active',
        due_date: dueDate,
        user_id: parseInt(user_id),
      });

      if (response.status === 200 || response.status === 201) {
        const newTask = response.data;
        onTaskAdded(newTask);
        setTitle('');
        setTimeout(() => {
          navigate('/tasks');
        }, 300);
      } else {
        console.error('Failed to create task');
      }
    } catch (err) {
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: '2rem',
        maxWidth: '600px',
        margin: '2rem auto',
        backgroundColor: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/tasks" style={{ textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: '#1d4ed8',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#1e40af';
              e.target.style.transform = 'scale(1.03)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#1d4ed8';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ← Back to Tasks
          </button>
        </Link>
      </div>

      <h3
        style={{
          fontSize: '1.6rem',
          fontWeight: '600',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: '#4a4a4a',
        }}
      >
        Add A New Task
      </h3>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
          style={{
            padding: '0.8rem 1.2rem',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '1rem',
            border: '1px solid #ddd',
            fontSize: '1rem',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            transition: '0.3s',
          }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            padding: '0.8rem 1.2rem',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '1rem',
            border: '1px solid #ddd',
            fontSize: '1rem',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            transition: '0.3s',
          }}
        />

        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            color: 'white',
            fontWeight: '600',
            padding: '0.8rem 2rem',
            borderRadius: '1rem',
            border: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'transform 0.3s ease-in-out',
            fontSize: '1rem',
          }}
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
