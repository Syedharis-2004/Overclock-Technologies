const mongoose = require('mongoose');

let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    const error = new Error('MONGO_URI is not defined in environment variables.');
    error.statusCode = 503;
    throw error;
  }

  if (cachedPromise && mongoose.connection.readyState === 2) {
    return cachedPromise;
  }

  try {
    cachedPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
    });

    const conn = await cachedPromise;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    cachedPromise = null;
    console.error(`MongoDB Connection Error: ${error.message}`);
    const dbErr = new Error(`Database connection failed: ${error.message}`);
    dbErr.statusCode = 503;
    throw dbErr;
  }
};

const isDBConnected = () => mongoose.connection.readyState === 1;

module.exports = connectDB;
module.exports.isDBConnected = isDBConnected;
