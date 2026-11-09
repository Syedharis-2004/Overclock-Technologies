const User = require('../models/User');
const asyncHandler = require('../middlewares/async');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Please provide an email and password' });
  }

  // Check for user in database
  let user = await User.findOne({ email }).select('+password');

  // If initial admin user has not been seeded yet into this database instance, seed it automatically
  if (!user && email === 'admin@overclock.com' && password === 'Ot@54321') {
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) {
      user = await User.create({
        name: 'Super Admin',
        email: 'admin@overclock.com',
        password: 'Ot@54321',
        role: 'admin'
      });
      return sendTokenResponse(user, 200, res);
    }
  }

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
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// Get token from model and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token
  });
};
