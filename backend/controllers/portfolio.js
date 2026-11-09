const Portfolio = require('../models/Portfolio');
const asyncHandler = require('../middlewares/async');

// @desc    Get all portfolio projects
// @route   GET /api/portfolio
// @access  Public
exports.getPortfolios = asyncHandler(async (req, res, next) => {
  const portfolios = await Portfolio.find().sort({ order: 1, createdAt: -1 });
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
  const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true
  });

  if (!portfolio) {
    return res.status(404).json({ success: false, error: 'Portfolio item not found' });
  }

  res.status(200).json({
    success: true,
    data: portfolio
  });
});

// @desc    Delete portfolio project
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
exports.deletePortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findByIdAndDelete(req.params.id);

  if (!portfolio) {
    return res.status(404).json({ success: false, error: 'Portfolio item not found' });
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Reorder portfolio projects
// @route   PUT /api/portfolio/reorder
// @access  Private/Admin
exports.reorderPortfolios = asyncHandler(async (req, res, next) => {
  const { orderedIds } = req.body;

  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide an array of orderedIds'
    });
  }

  const updates = orderedIds.map((id, index) =>
    Portfolio.findByIdAndUpdate(id, { order: index })
  );
  await Promise.all(updates);

  const reordered = await Portfolio.find().sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    data: reordered
  });
});
