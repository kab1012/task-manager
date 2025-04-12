import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backend_domain from '../helpers/api.ts';
const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const user_id = localStorage?.getItem('user_id');
  
  
  const navigate = useNavigate();

  // Fetch tasks from backend
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
          // Show incomplete (active) tasks first
          if (a.completed !== b.completed) return a.completed ? 1 : -1;

          // If both are same in completion status, keep latest ones on top (assuming higher ID = newer)
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
        padding: '20px',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
          Task List
        </h3>
        <button
          onClick={() => navigate('/add')}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1d4ed8')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#2563eb')}
        >
          Add A Task
        </button>
      </div>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        ))
      ) : (
        <p style={{ color: '#777', fontStyle: 'italic' }}>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
