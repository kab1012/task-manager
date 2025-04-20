import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backend_domain from '../helpers/api.ts';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const user_id = localStorage?.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${backend_domain}/api/tasks/users/${Number(user_id)}`);
        const formattedTasks = response.data.map((task) => ({
          id: task.id,
          title: task.tasks,
          completed: task.status !== 'active',
        }));

        const sortedTasks = formattedTasks.sort((a, b) => {
          if (a.completed !== b.completed) return a.completed ? 1 : -1;
          return b.id - a.id;
        });

        setTasks(sortedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [user_id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backend_domain}/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const updatedStatus = task.completed ? 'active' : 'completed';

    try {
      await axios.patch(`${backend_domain}/api/tasks/${id}/complete`, {
        status: updatedStatus,
      });

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div
      style={{
        padding: '20px 1px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#1f2937' }}>
          📝 Your Tasks
        </h2>

        <button
          onClick={() => navigate('/add')}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#2563eb';
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 14px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#3b82f6';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
          }}
        >
          ➕ Add Task
        </button>


      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                padding: '16px 20px',
                backgroundColor: task.completed ? '#e0f2fe' : '#fef9c3',
                borderLeft: `6px solid ${task.completed ? '#3b82f6' : '#facc15'}`,
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <TaskItem
                task={task}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
            </div>
          ))
        ) : (
          <p style={{ color: '#6b7280', fontStyle: 'italic', textAlign: 'center' }}>
            No tasks available. Start by adding a new one!
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
