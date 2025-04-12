import React from 'react';

const TaskItem = ({ task, onDelete, onComplete }) => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    gap: '10px',
    flexWrap: 'nowrap',
  };

  const titleStyle = {
    textDecoration: task.completed ? 'line-through' : 'none',
    fontSize: '1rem',
    color: task.completed ? '#888' : '#333',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flexGrow: 1,
    minWidth: 0,
  };

  const buttonStyle = {
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    flexShrink: 0,
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
    marginLeft: '8px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexShrink: 0,
  };

  return (
    <div style={containerStyle}>
      <span style={titleStyle}>{task.title}</span>
      <div style={buttonContainerStyle}>
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
