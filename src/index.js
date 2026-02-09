const express = require('express');
const config = require('./config/env');
const db = require('./models');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json({ limit: config.server?.bodyLimit || '10mb' }));

// Routes
app.get(`${config.api.prefix}/health`, (req, res) => {
  res.json({ status: 'success', service: 'appointment-service' });
});

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Export app for testing
module.exports = app;

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const startServer = async () => {
    try {
      await db.sequelize.authenticate();
      console.log('✓ Database connected');

      if (config.app.nodeEnv === 'development') {
        await db.sequelize.sync({ alter: true });
      }

      app.listen(config.app.port, () => {
        console.log(`\nAppointment Service running on port ${config.app.port}`);
      });
    } catch (error) {
      console.error('Failed to start:', error);
      process.exit(1);
    }
  };

  startServer();
}
