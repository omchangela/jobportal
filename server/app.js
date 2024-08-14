const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRouter');
const healthRouter = require('./routes/healthRoute');
const jobRouter = require('./routes/jobRoute');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Base route
app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Job Listing API 🚀'
  });
});

// Route handlers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/health', healthRouter);

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError('Route not found', 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
