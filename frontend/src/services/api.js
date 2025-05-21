import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL
});

// Todo API endpoints
export const getTodos = async () => {
  const response = await api.get('/todos');
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await api.post('/todos', todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await api.put(`/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};

// Summarize and send to Slack
export const summarizeAndSendToSlack = async () => {
  const response = await api.post('/summarize');
  return response.data;
};