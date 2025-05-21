import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, toggleComplete, updateTodo, deleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-todos">
        <p>No todos yet. Add a new todo to get started!</p>
      </div>
    );
  }

  // Separate completed and pending todos
  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-list-container">
      <h2>Your Todos</h2>
      
      {/* Pending Todos Section */}
      {pendingTodos.length > 0 && (
        <div className="todos-section">
          <h3>Pending</h3>
          <div className="todo-list">
            {pendingTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Completed Todos Section */}
      {completedTodos.length > 0 && (
        <div className="todos-section completed-section">
          <h3>Completed</h3>
          <div className="todo-list">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;