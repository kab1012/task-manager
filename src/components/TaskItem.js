import React from 'react';
import { Link } from 'react-router-dom';

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
    padding: '8px 14px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    flexShrink: 0,
  };

  const completeButtonStyle = {
    ...buttonStyle,
    backgroundColor: task.completed ? '#ffc107' : '#4caf50',
    color: '#fff',
  };

  const completeButtonHoverStyle = {
    backgroundColor: task.completed ? '#e0a800' : '#388e3c',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff4d4f',
    color: '#fff',
    marginLeft: '8px',
  };

  const deleteButtonHoverStyle = {
    backgroundColor: '#d9363e',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexShrink: 0,
  };

  // Button hover state logic using local state (optional enhancement)
  const [hovered, setHovered] = React.useState({ complete: false, delete: false });

  return (
    <Link
      to={`/task/${task.id}`}
      style={{ flex: 1, textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}
    >
      <div style={containerStyle} onClick={e => e.stopPropagation()}>
        <span style={titleStyle}>{task.title}</span>
        <div style={buttonContainerStyle}>
          <button
            style={{
              ...completeButtonStyle,
              ...(hovered.complete ? completeButtonHoverStyle : {}),
            }}
            onClick={e => {
              e.preventDefault();
              onComplete(task.id);
            }}
            onMouseEnter={() => setHovered(prev => ({ ...prev, complete: true }))}
            onMouseLeave={() => setHovered(prev => ({ ...prev, complete: false }))}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>

          <button
            style={{
              ...deleteButtonStyle,
              ...(hovered.delete ? deleteButtonHoverStyle : {}),
            }}
            onClick={e => {
              e.preventDefault();
              onDelete(task.id);
            }}
            onMouseEnter={() => setHovered(prev => ({ ...prev, delete: true }))}
            onMouseLeave={() => setHovered(prev => ({ ...prev, delete: false }))}
          >
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TaskItem;
