import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backend_domain from '../helpers/api.ts';

const TaskList = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const navigate = useNavigate();

  // Fetch all users and tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, tasksRes] = await Promise.all([
          axios.get(`${backend_domain}/api/users`),
          axios.get(`${backend_domain}/api/tasks`),
        ]);

        setUsers(usersRes.data);

        const formattedTasks = tasksRes.data.map((task) => ({
          id: task.id,
          title: task.tasks,
          completed: task.status !== 'active',
          userId: task.user_id,
        }));

        const sortedTasks = formattedTasks.sort((a, b) => {
          if (a.completed !== b.completed) return a.completed ? 1 : -1;
          return b.id - a.id;
        });

        setAllTasks(sortedTasks);
        setFilteredTasks(sortedTasks);
      } catch (error) {
        console.error('Error fetching users or tasks:', error);
      }
    };

    fetchData();
  }, []);

  // Filter tasks by selected user
  useEffect(() => {
    if (selectedUserId) {
      setFilteredTasks(allTasks.filter((task) => task.userId === parseInt(selectedUserId)));
    } else {
      setFilteredTasks(allTasks);
    }
  }, [selectedUserId, allTasks]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backend_domain}/api/tasks/${id}`);
      const updated = allTasks.filter((task) => task.id !== id);
      setAllTasks(updated);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleComplete = async (id) => {
    const task = allTasks.find((t) => t.id === id);
    const updatedStatus = task.completed ? 'active' : 'completed';

    try {
      await axios.patch(`${backend_domain}/api/tasks/${id}/complete`, {
        status: updatedStatus,
      });

      const updatedTasks = allTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setAllTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
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
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Task List</h3>
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

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="user-filter" style={{ marginRight: '10px' }}>
          Filter by User:
        </label>
        <select
          id="user-filter"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          style={{
            padding: '6px 10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            minWidth: '180px',
          }}
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username || user.name || `User ${user.id}`}
            </option>
          ))}
        </select>
      </div>

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
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
