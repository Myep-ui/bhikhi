require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Create uploads directory
!fs.existsSync('./uploads') && fs.mkdirSync('./uploads');

const app = express();

// Middleware
app.use(cors());  // Enable CORS for all origins during development

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add headers for CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use('/uploads', express.static('uploads'));

// Routes
const apiRouter = express.Router();

apiRouter.use('/auth', require('./routes/auth'));
apiRouter.use('/expenses', require('./routes/expenses'));
apiRouter.use('/users', require('./routes/users'));
apiRouter.use('/departments', require('./routes/departments'));
apiRouter.use('/projects', require('./routes/projects'));
apiRouter.use('/transport-modes', require('./routes/transportModes'));

app.use('/api', apiRouter);

app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `✓ Server is running on port ${PORT}`);
  console.log('\x1b[36m%s\x1b[0m', `✓ API endpoint: http://localhost:${PORT}/api`);
  console.log('\x1b[33m%s\x1b[0m', '✓ Press CTRL+C to stop the server');
});