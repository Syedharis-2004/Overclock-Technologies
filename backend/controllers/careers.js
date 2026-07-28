const Career = require('../models/Career');
const asyncHandler = require('../middlewares/async');

// @desc    Get all careers
// @route   GET /api/careers
// @access  Public
exports.getCareers = asyncHandler(async (req, res, next) => {
  const careers = await Career.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: careers.length,
    data: careers
  });
});

// @desc    Get single career
// @route   GET /api/careers/:id
// @access  Public
exports.getCareer = asyncHandler(async (req, res, next) => {
  const career = await Career.findById(req.params.id);

  if (!career) {
    return res.status(404).json({ success: false, error: 'Job listing not found' });
  }

  res.status(200).json({
    success: true,
    data: career
  });
});

// @desc    Create new career
// @route   POST /api/careers
// @access  Private/Admin
exports.createCareer = asyncHandler(async (req, res, next) => {
  const career = await Career.create(req.body);

  res.status(201).json({
    success: true,
    data: career
  });
});

// @desc    Update career
// @route   PUT /api/careers/:id
// @access  Private/Admin
exports.updateCareer = asyncHandler(async (req, res, next) => {
  let career = await Career.findById(req.params.id);

  if (!career) {
    return res.status(404).json({ success: false, error: 'Job listing not found' });
  }

  career = await Career.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: career
  });
});

// @desc    Delete career
// @route   DELETE /api/careers/:id
// @access  Private/Admin
exports.deleteCareer = asyncHandler(async (req, res, next) => {
  const career = await Career.findById(req.params.id);

  if (!career) {
    return res.status(404).json({ success: false, error: 'Job listing not found' });
  }

  await career.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
