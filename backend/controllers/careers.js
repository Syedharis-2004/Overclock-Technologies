const Career = require('../models/Career');
const asyncHandler = require('../middlewares/async');

// @desc    Get all careers
// @route   GET /api/careers
// @access  Public
exports.getCareers = asyncHandler(async (req, res, next) => {
  const careers = await Career.find().sort({ order: 1, createdAt: -1 });
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
  const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true
  });

  if (!career) {
    return res.status(404).json({ success: false, error: 'Job listing not found' });
  }

  res.status(200).json({
    success: true,
    data: career
  });
});

// @desc    Delete career
// @route   DELETE /api/careers/:id
// @access  Private/Admin
exports.deleteCareer = asyncHandler(async (req, res, next) => {
  const career = await Career.findByIdAndDelete(req.params.id);

  if (!career) {
    return res.status(404).json({ success: false, error: 'Job listing not found' });
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Reorder careers
// @route   PUT /api/careers/reorder
// @access  Private/Admin
exports.reorderCareers = asyncHandler(async (req, res, next) => {
  const { orderedIds } = req.body;

  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide an array of orderedIds'
    });
  }

  const updates = orderedIds.map((id, index) =>
    Career.findByIdAndUpdate(id, { order: index })
  );
  await Promise.all(updates);

  const reordered = await Career.find().sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    data: reordered
  });
});
