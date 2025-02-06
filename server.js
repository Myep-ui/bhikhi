require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Create uploads directory
!fs.existsSync('./uploads') && fs.mkdirSync('./uploads');

const app = express();

// Middleware
app.use(cors({
  origin: ["https://eloquent-kitsune-28f1c6.netlify.app", "http://localhost:3000"],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
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
// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `✓ Server is running on port ${PORT}`);
  console.log('\x1b[36m%s\x1b[0m', `✓ API endpoint: http://localhost:${PORT}/api`);
  console.log('\x1b[33m%s\x1b[0m', '✓ Press CTRL+C to stop the server');
});