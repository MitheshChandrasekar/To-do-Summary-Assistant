import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      addTodo({
        title: title.trim(),
        description: description.trim(),
        completed: false
      });
      
      // Reset form fields
      setTitle('');
      setDescription('');
      setErrors({});
    }
  };

  return (
    <div className="todo-form-container">
      <h2>Add New Todo</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
            rows="3"
          />
        </div>
        
        <button type="submit" className="add-btn">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;