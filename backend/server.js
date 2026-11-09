const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');

// Load environment variables
dotenv.config();

const app = express();

// Trust proxy for secure cookies / headers on Vercel / reverse proxy
app.set('trust proxy', 1);

// CORS configuration
const allowedOrigins = [
  'https://overclock-technologies.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000'
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL.replace(/\/$/, ''));
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests or curls
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');
    if (
      allowedOrigins.includes(cleanOrigin) ||
      /^https:\/\/overclock-technologies.*\.vercel\.app$/.test(cleanOrigin) ||
      cleanOrigin.startsWith('http://localhost:') ||
      cleanOrigin.startsWith('http://127.0.0.1:')
    ) {
      return callback(null, true);
    }

    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};

app.use(cors(corsOptions));

// Body parsing with 10MB limit for base64 image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection middleware for serverless & traditional servers
app.use(async (req, res, next) => {
  // Allow root health ping without waiting on DB
  if (req.path === '/' || req.path === '/api/health-check') {
    return next();
  }

  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection middleware failed:', err.message);
    res.status(503).json({
      success: false,
      error: 'Database connection failed. Please ensure your MongoDB cluster is running and MONGO_URI is configured correctly.',
      details: err.message
    });
  }
});

// Root & Health Check routes
app.get('/', (req, res) => {
  res.send('Software House API is running...');
});

app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const isConnected = mongoose.connection.readyState === 1;
  res.status(isConnected ? 200 : 503).json({
    success: isConnected,
    database: isConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/team', require('./routes/team'));

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
