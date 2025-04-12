import React, { useState, useEffect } from 'react';
import { useNavigate, Router } from 'react-router-dom';
import axios from 'axios';
import backend_domain from '../helpers/api.ts';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backend_domain}/api/users`);
        setUsers(response.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${backend_domain}/api/tasks`, {
        tasks: title,
        status: 'active',
        user_id: parseInt(userId),
      });

      if (response.status === 200 || response.status === 201) {
        const newTask = response.data;
        onTaskAdded(newTask);
        setTitle('');
        setUserId('');
        setTimeout(() => {
          navigate('/tasks');
        }, 300);
      } else {
        console.error('Failed to create task');
      }
    } catch (err) {
      console.error('Error creating task:', err);
    } finally {
      setTimeout(() => {
        navigate('/tasks');
      }, 300);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: '2rem',
        maxWidth: '700px',
        margin: '0 auto',
        backgroundColor: '#f9fafb',
        borderRadius: '1rem',
        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
      }}
    >
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        Add a New Task
      </h3>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{
            padding: '0.5rem',
            minWidth: '280px',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} (ID: {user.id})
            </option>
          ))}
        </select>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
          style={{
            padding: '0.5rem',
            minWidth: '280px',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />

        {loading ?

          <button
            type="submit"
            style={{
              background: 'linear-gradient(to right, #3b82f6, #6366f1)',
              color: 'white',
              fontWeight: '600',
              padding: '0.6rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.03)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            disabled={loading}
          >
            Adding....
          </button>
          :
          <button
            type="submit"
            style={{
              background: 'linear-gradient(to right, #3b82f6, #6366f1)',
              color: 'white',
              fontWeight: '600',
              padding: '0.6rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.03)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            disabled={loading}
          >
            Add Task
          </button>
        }
      </div>
    </form>
  );
};

export default TaskForm;
