import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import SummaryButton from './components/SummaryButton';
import * as api from './services/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await api.getTodos();
      setTodos(data);
    } catch (error) {
      toast.error('Failed to fetch todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo) => {
    try {
      const newTodo = await api.createTodo(todo);
      setTodos([newTodo, ...todos]);
      toast.success('Todo added successfully');
    } catch (error) {
      toast.error('Failed to add todo');
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const updated = await api.updateTodo(id, updatedTodo);
      setTodos(todos.map(todo => todo.id === id ? updated : todo));
      toast.success('Todo updated successfully');
    } catch (error) {
      toast.error('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await updateTodo(todo.id, updatedTodo);
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  const handleSummarize = async () => {
    try {
      setSummarizing(true);
      const result = await api.summarizeAndSendToSlack();
      
      if (result.success) {
        toast.success('Summary sent to Slack successfully');
        setSummary(result.summary);
        setShowSummary(true);
      } else {
        toast.error('Failed to send summary to Slack');
      }
    } catch (error) {
      toast.error('Failed to generate and send summary');
      console.error('Error summarizing todos:', error);
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div className="app">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <header className="app-header">
        <h1>Todo Summary Assistant</h1>
        <p>Manage your todos and get AI-generated summaries</p>
      </header>
      
      <main className="app-main">
        <TodoForm addTodo={addTodo} />
        
        <div className="summary-section">
          <SummaryButton 
            onClick={handleSummarize} 
            loading={summarizing} 
            disabled={loading || summarizing || todos.length === 0}
          />
          
          {showSummary && (
            <div className="summary-result">
              <h3>Generated Summary</h3>
              <p>{summary}</p>
              <button onClick={() => setShowSummary(false)} className="close-btn">
                Close
              </button>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList
            todos={todos}
            toggleComplete={toggleComplete}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        )}
      </main>
      
      <footer className="app-footer">
       
      </footer>
    </div>
  );
}

export default App;