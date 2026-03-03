import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import app from './app';
import connectDB from './config/database';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB then start server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: Error) => {
    console.error('UNHANDLED REJECTION! Shutting down...', err.message);
    server.close(() => process.exit(1));
  });

  // Handle SIGTERM
  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => console.log('Process terminated!'));
  });
});