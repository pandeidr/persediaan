const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Compression and logging
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('uploads'));

// Database connection (optional for development without DB)
let sequelize = null;
try {
  const db = require('./config/database');
  sequelize = db.sequelize;
  
  // Test database connection
  sequelize.authenticate()
    .then(() => {
      console.log('✅ Database connection established successfully.');
    })
    .catch(err => {
      console.error('❌ Unable to connect to the database:', err.message);
      console.log('ℹ️  Server will continue without database for testing purposes.');
    });
} catch (error) {
  console.error('❌ Database configuration error:', error.message);
  console.log('ℹ️  Server will continue without database for testing purposes.');
}

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/purchase-orders', require('./routes/purchaseOrders'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/vendors', require('./routes/vendors'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Persediaan Accounting Software API',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/api/health'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Global Error Handler:', error);
  
  // Sequelize validation errors
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: error.errors.map(e => e.message).join(', ')
    });
  }
  
  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Authentication Error',
      message: 'Invalid token'
    });
  }
  
  // Default error response
  res.status(error.status || 500).json({
    error: error.name || 'Internal Server Error',
    message: error.message || 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  if (sequelize) {
    sequelize.close().then(() => {
      console.log('💾 Database connection closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  if (sequelize) {
    sequelize.close().then(() => {
      console.log('💾 Database connection closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;