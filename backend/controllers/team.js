const Team = require('../models/Team');
const asyncHandler = require('../middlewares/async');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = asyncHandler(async (req, res, next) => {
  const team = await Team.find().sort({ order: 1, createdAt: -1 });
  res.status(200).json({
    success: true,
    count: team.length,
    data: team
  });
});

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
exports.getTeamMember = asyncHandler(async (req, res, next) => {
  const member = await Team.findById(req.params.id);
  if (!member) {
    return res.status(404).json({ success: false, error: 'Team member not found' });
  }

  res.status(200).json({
    success: true,
    data: member
  });
});

// @desc    Create new team member
// @route   POST /api/team
// @access  Private/Admin
exports.createTeamMember = asyncHandler(async (req, res, next) => {
  const member = await Team.create(req.body);
  res.status(201).json({
    success: true,
    data: member
  });
});

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private/Admin
exports.updateTeamMember = asyncHandler(async (req, res, next) => {
  const member = await Team.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true
  });

  if (!member) {
    return res.status(404).json({ success: false, error: 'Team member not found' });
  }

  res.status(200).json({
    success: true,
    data: member
  });
});

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
exports.deleteTeamMember = asyncHandler(async (req, res, next) => {
  const member = await Team.findByIdAndDelete(req.params.id);

  if (!member) {
    return res.status(404).json({ success: false, error: 'Team member not found' });
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Reorder team members
// @route   PUT /api/team/reorder
// @access  Private/Admin
exports.reorderTeam = asyncHandler(async (req, res, next) => {
  const { orderedIds } = req.body;

  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide an array of orderedIds'
    });
  }

  const updates = orderedIds.map((id, index) =>
    Team.findByIdAndUpdate(id, { order: index })
  );
  await Promise.all(updates);

  const reordered = await Team.find().sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    data: reordered
  });
});
