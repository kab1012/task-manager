import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backend_domain from '../helpers/api.ts';

export const Home = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${backend_domain}/api/tasks`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const today = new Date().toDateString();

  const pendingToday = tasks.filter(
    task =>
      task.status !== 'completed' &&
      new Date(task.due_date).toDateString() === today
  );

  const upcoming = tasks.filter(
    task =>
      task.status !== 'completed' &&
      new Date(task.due_date) > new Date()
  );

  const overdue = tasks.filter(
    task =>
      task.status !== 'completed' &&
      new Date(task.due_date) < new Date() && 
      new Date(task.due_date).toDateString() !== today
  );

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>
        👋 Welcome to the Task Manager
      </h2>

      {isMobile && (
        <p style={{ fontSize: '1rem', color: '#4b5563', marginBottom: '1rem' }}>
          Tip: Use the sidebar to view or add tasks.
        </p>
      )}

      {loading ? (
        <p style={{ fontSize: '1rem', textAlign: 'center' }}>Loading tasks...</p>
      ) : (
        <>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>
              🗓️ Summary for {today}
            </h3>
            <p><strong>Pending Today:</strong> {pendingToday.length}</p>
            <p><strong>Upcoming Tasks:</strong> {upcoming.length}</p>
            <p><strong>Overdue Tasks:</strong> {overdue.length}</p>
            <p><strong>Total Tasks:</strong> {tasks.length}</p>
          </div>

          {overdue.length > 0 && (
            <div
              style={{
                background: '#fee2e2',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f87171',
                marginBottom: '1rem',
              }}
            >
              <h4 style={{ marginBottom: '0.5rem', color: '#b91c1c' }}>
                ⏰ Overdue Tasks:
              </h4>
              <ul style={{ paddingLeft: '1rem' }}>
                {overdue.map(task => (
                  <li
                    key={task.id}
                    onClick={() => navigate(`/task/${task.id}`)}
                    style={{
                      cursor: 'pointer',
                      color: '#e11d48',
                      marginBottom: '0.5rem',
                      textDecoration: 'underline',
                    }}
                  >
                    <strong>{task.tasks}</strong> — Was due by {new Date(task.due_date).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '1rem', color: '#991b1b' }}>
                🚨 These tasks are overdue! Prioritize them to avoid delays.
              </p>
            </div>
          )}

          {pendingToday.length > 0 ? (
            <div
              style={{
                background: '#fff7ed',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #fed7aa',
                marginBottom: '1rem',
              }}
            >
              <h4 style={{ marginBottom: '0.5rem', color: '#b45309' }}>
                🚨 Pending Tasks for Today:
              </h4>
              <ul style={{ paddingLeft: '1rem' }}>
                {pendingToday.map(task => (
                  <li
                    key={task.id}
                    onClick={() => navigate(`/task/${task.id}`)}
                    style={{
                      cursor: 'pointer',
                      color: '#1d4ed8',
                      marginBottom: '0.5rem',
                      textDecoration: 'underline',
                    }}
                  >
                    <strong>{task.tasks}</strong> — Due by {new Date(task.due_date).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '1rem', color: '#92400e' }}>
                ✅ Suggestion: Tackle the most urgent tasks first. Consider setting reminders!
              </p>
            </div>
          ) : (
            <div
              style={{
                background: '#ecfdf5',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #a7f3d0',
                marginBottom: '1rem',
              }}
            >
              <h4 style={{ marginBottom: '0.5rem', color: '#047857' }}>
                🎉 You're all caught up for today!
              </h4>
              <p>Maybe review upcoming tasks or plan ahead for tomorrow.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
