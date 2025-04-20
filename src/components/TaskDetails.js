import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import backend_domain from '../helpers/api.ts';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cap = (str) => str && str[0].toUpperCase() + str.slice(1);

  const formatDate = (dateString) =>
    new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(dateString));

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${backend_domain}/api/tasks/${Number(id)}`);
        if (!response.ok) throw new Error('Failed to fetch task');
        const data = await response.json();
        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading...</p>;
  if (error)
    return (
      <p style={{ color: 'red', textAlign: 'center', fontSize: '1.2rem' }}>
        Error: {error}
      </p>
    );
  if (!task)
    return (
      <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>
        No task found.
      </p>
    );

  return (
    <div
      style={{
        maxWidth: '720px',
        margin: '3rem auto',
        padding: '2.5rem',
        backgroundColor: '#f9fafb',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
        fontFamily: 'Segoe UI, sans-serif',
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

      <h2
        style={{
          fontSize: '2rem',
          color: '#111827',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '0.5rem',
          marginBottom: '1.8rem',
        }}
      >
        🗂️ Task Overview
      </h2>

      <div style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.8' }}>
        <p>
          <strong style={{ color: '#111' }}>🆔 ID:</strong> {task.id}
        </p>
        <p>
          <strong style={{ color: '#111' }}>📝 Title:</strong> {cap(task.tasks)}
        </p>
        <p>
          <strong style={{ color: '#111' }}>📌 Status:</strong>{' '}
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: '600',
              backgroundColor: task.status === 'completed' ? '#d1fae5' : '#fee2e2',
              color: task.status === 'completed' ? '#065f46' : '#b91c1c',
              marginLeft: '8px',
            }}
          >
            {cap(task.status)}
          </span>
        </p>
        <p>
          <strong style={{ color: '#111' }}>📅 Created:</strong> {formatDate(task.created_at)}
        </p>
        <p>
          <strong style={{ color: '#111' }}>⏳ Due:</strong> {formatDate(task.due_date)}
        </p>
      </div>

      {/* Dummy Text: Task Description */}
      <div style={{ marginTop: '2rem', fontSize: '1.1rem', color: '#374151', lineHeight: '1.8' }}>
        <h3
          style={{
            fontSize: '1.4rem',
            color: '#111827',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          📝 Task Description
        </h3>
        <p>
          This is a sample task description. You can track the progress of the task here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam gravida bibendum mi, a tempor nisi convallis nec. Nullam euismod eu orci et tempus. Donec ullamcorper arcu id turpis efficitur, nec tincidunt erat condimentum.
        </p>
      </div>

      {/* Dummy Text: Progress Section */}
      <div style={{ marginTop: '2rem', fontSize: '1.1rem', color: '#374151', lineHeight: '1.8' }}>
        <h3
          style={{
            fontSize: '1.4rem',
            color: '#111827',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          ⏳ Task Progress
        </h3>
        <p>
          Progress: <strong>75%</strong>
        </p>
        <div style={{ width: '100%', backgroundColor: '#e5e7eb', height: '10px', borderRadius: '5px' }}>
          <div
            style={{
              width: '75%',
              backgroundColor: '#4ade80',
              height: '100%',
              borderRadius: '5px',
            }}
          ></div>
        </div>
        <p style={{ marginTop: '1rem' }}>
          The task is almost complete. Only a few more steps to finish it. Keep up the good work!
        </p>
      </div>
    </div>
  );
};

export default TaskDetails;
