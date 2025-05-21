require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const summarizeRoutes = require('./routes/summarizeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);
app.use('/summarize', summarizeRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Todo Summary Assistant API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});