const Portfolio = require('../models/Portfolio');
const asyncHandler = require('../middlewares/async');

// @desc    Get all portfolio projects
// @route   GET /api/portfolio
// @access  Public
exports.getPortfolios = asyncHandler(async (req, res, next) => {
  const portfolios = await Portfolio.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: portfolios.length,
    data: portfolios
  });
});

// @desc    Get single portfolio project
// @route   GET /api/portfolio/:id
// @access  Public
exports.getPortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    return res.status(404).json({ success: false, error: 'Portfolio item not found' });
  }

  res.status(200).json({
    success: true,
    data: portfolio
  });
});

// @desc    Create new portfolio project
// @route   POST /api/portfolio
// @access  Private/Admin
exports.createPortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.create(req.body);

  res.status(201).json({
    success: true,
    data: portfolio
  });
});

// @desc    Update portfolio project
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
exports.updatePortfolio = asyncHandler(async (req, res, next) => {
  let portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    return res.status(404).json({ success: false, error: 'Portfolio item not found' });
  }

  portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: portfolio
  });
});

// @desc    Delete portfolio project
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
exports.deletePortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    return res.status(404).json({ success: false, error: 'Portfolio item not found' });
  }

  await portfolio.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
