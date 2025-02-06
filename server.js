require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Basic CORS setup
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Test database connection
const db = require('./config/database');
app.get('/api/test-db', async (req, res) => {
  try {
    const [result] = await db.query('SELECT 1 as value');
    res.json({ 
      status: 'connected',
      result: result[0]
    });
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/users', require('./routes/users'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/transport-modes', require('./routes/transportModes'));

// Error handling
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Development server running on port ${PORT}`);
  });
}

module.exports = app;