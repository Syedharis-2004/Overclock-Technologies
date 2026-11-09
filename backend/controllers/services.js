const Service = require('../models/Service');
const asyncHandler = require('../middlewares/async');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = asyncHandler(async (req, res, next) => {
  const services = await Service.find().sort({ order: 1, createdAt: -1 });
  res.status(200).json({
    success: true,
    count: services.length,
    data: services
  });
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = asyncHandler(async (req, res, next) => {
  const service = await Service.create(req.body);
  res.status(201).json({
    success: true,
    data: service
  });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = asyncHandler(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true
  });

  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = asyncHandler(async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Reorder services
// @route   PUT /api/services/reorder
// @access  Private/Admin
exports.reorderServices = asyncHandler(async (req, res, next) => {
  const { orderedIds } = req.body;

  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide an array of orderedIds'
    });
  }

  const updates = orderedIds.map((id, index) =>
    Service.findByIdAndUpdate(id, { order: index })
  );
  await Promise.all(updates);

  const reordered = await Service.find().sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    data: reordered
  });
});
