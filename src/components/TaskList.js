import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        const formattedTasks = response.data.map((task) => ({
          id: task.id,
          title: task.tasks,
          completed: task.status !== 'active',
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/apitasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const updatedStatus = task.completed ? 'active' : 'completed';

    try {
      await axios.patch(`http://localhost:3000/api/tasks/${id}/complete`, {
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
