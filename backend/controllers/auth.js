const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Default admin credentials for use when MongoDB is not connected
const ADMIN_EMAIL = 'admin@overclock.com';
const ADMIN_PASSWORD = 'password123';

const isDBConnected = () => mongoose.connection.readyState === 1;

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(503).json({ success: false, error: 'Database not available. Registration requires MongoDB.' });
  }

  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Please provide an email and password' });
  }

  // If MongoDB is not connected, fall back to hardcoded admin credentials
  if (!isDBConnected()) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { id: 'admin-standalone', role: 'admin' },
        process.env.JWT_SECRET || 'overclock_secret_fallback',
        { expiresIn: '30d' }
      );
      return res.status(200).json({ success: true, token });
    }
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  // Normal DB-backed login
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(200).json({
      success: true,
      data: { id: 'admin-standalone', name: 'Super Admin', email: ADMIN_EMAIL, role: 'admin' }
    });
  }

  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token });
};
