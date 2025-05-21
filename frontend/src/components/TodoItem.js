import React, { useState } from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes, FaSave } from 'react-icons/fa';
import './TodoItem.css';

const TodoItem = ({ todo, toggleComplete, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleUpdate = () => {
    // Don't update if title is empty
    if (editTitle.trim() === '') return;
    
    updateTodo(todo.id, {
      ...todo,
      title: editTitle.trim(),
      description: editDescription.trim()
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        // Edit Mode
        <div className="todo-edit-form">
          <div className="form-group">
            <label htmlFor={`edit-title-${todo.id}`}>Title</label>
            <input
              type="text"
              id={`edit-title-${todo.id}`}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor={`edit-desc-${todo.id}`}>Description</label>
            <textarea
              id={`edit-desc-${todo.id}`}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows="2"
            />
          </div>
          
          <div className="todo-actions">
            <button onClick={handleUpdate} className="action-btn save-btn">
              <FaSave /> Save
            </button>
            <button onClick={handleCancel} className="action-btn cancel-btn">
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <>
          <div className="todo-content">
            <div className="todo-checkbox">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo)}
                id={`todo-${todo.id}`}
              />
              <label htmlFor={`todo-${todo.id}`}>
                <FaCheck className="check-icon" />
              </label>
            </div>
            
            <div className="todo-text">
              <h4>{todo.title}</h4>
              {todo.description && <p>{todo.description}</p>}
            </div>
          </div>
          
          <div className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="action-btn edit-btn"
              disabled={todo.completed}
            >
              <FaEdit />
            </button>
            <button onClick={() => deleteTodo(todo.id)} className="action-btn delete-btn">
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;