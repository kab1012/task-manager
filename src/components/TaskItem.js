import React from 'react';

const TaskItem = ({ task, onDelete, onComplete }) => {
  const containerStyle = {
    margin: '10px 0',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    flexWrap: 'wrap',
  };

  const titleStyle = {
    textDecoration: task.completed ? 'line-through' : 'none',
    fontSize: '1rem',
    color: task.completed ? '#888' : '#333',
    flexGrow: 1,
    wordBreak: 'break-word',
  };

  const buttonStyle = {
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: '10px',
  };

  const completeButtonStyle = {
    ...buttonStyle,
    backgroundColor: task.completed ? '#ffc107' : '#4caf50',
    color: '#fff',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff4d4f',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      <span style={titleStyle}>{task.title}</span>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={completeButtonStyle} onClick={() => onComplete(task.id)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button style={deleteButtonStyle} onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
