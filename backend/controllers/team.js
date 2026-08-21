const Team = require('../models/Team');
const asyncHandler = require('../middlewares/async');
const mongoose = require('mongoose');

const isDBConnected = () => mongoose.connection.readyState === 1;

let inMemoryTeam = [
  {
    _id: 'tm-1',
    name: 'Alex Vance',
    role: 'Chief Executive Officer & Founder',
    bio: 'Tech visionary with 12+ years leading enterprise digital transformation and AI innovations.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    order: 1
  },
  {
    _id: 'tm-2',
    name: 'Sophia Chen',
    role: 'Head of AI & Software Architecture',
    bio: 'Ex-Google AI engineer specializing in scalable cloud infrastructures and deep learning systems.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    order: 2
  },
  {
    _id: 'tm-3',
    name: 'David Miller',
    role: 'Lead UI/UX Designer',
    bio: 'Award-winning Product Designer with a passion for futuristic glassmorphism aesthetics and conversion design.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    order: 3
  }
];

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const team = await Team.find().sort({ order: 1, createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: team.length,
        data: team
      });
    } catch (err) {
      console.warn('DB query failed in getTeamMembers, using fallback:', err.message);
    }
  }

  res.status(200).json({
    success: true,
    count: inMemoryTeam.length,
    data: inMemoryTeam
  });
});

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
exports.getTeamMember = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const member = await Team.findById(req.params.id);
      if (member) {
        return res.status(200).json({ success: true, data: member });
      }
    } catch (err) {
      console.warn('DB query failed in getTeamMember, using fallback:', err.message);
    }
  }

  const item = inMemoryTeam.find(t => t._id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Team member not found' });
  }

  res.status(200).json({ success: true, data: item });
});

// @desc    Create new team member
// @route   POST /api/team
// @access  Private/Admin
exports.createTeamMember = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const member = await Team.create(req.body);
      return res.status(201).json({ success: true, data: member });
    } catch (err) {
      console.warn('DB create failed in createTeamMember, using fallback:', err.message);
    }
  }

  const newItem = { _id: 'tm-' + Date.now(), ...req.body };
  inMemoryTeam.push(newItem);
  res.status(201).json({ success: true, data: newItem });
});

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private/Admin
exports.updateTeamMember = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      let member = await Team.findById(req.params.id);
      if (member) {
        member = await Team.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        return res.status(200).json({ success: true, data: member });
      }
    } catch (err) {
      console.warn('DB update failed in updateTeamMember, using fallback:', err.message);
    }
  }

  const index = inMemoryTeam.findIndex(t => t._id === req.params.id);
  if (index !== -1) {
    inMemoryTeam[index] = { ...inMemoryTeam[index], ...req.body };
    return res.status(200).json({ success: true, data: inMemoryTeam[index] });
  }

  const updatedItem = { _id: req.params.id, ...req.body };
  inMemoryTeam.push(updatedItem);
  res.status(200).json({ success: true, data: updatedItem });
});

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
exports.deleteTeamMember = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const member = await Team.findById(req.params.id);
      if (member) {
        await member.deleteOne();
        return res.status(200).json({ success: true, data: {} });
      }
    } catch (err) {
      console.warn('DB delete failed in deleteTeamMember, using fallback:', err.message);
    }
  }

  inMemoryTeam = inMemoryTeam.filter(t => t._id !== req.params.id);
  res.status(200).json({ success: true, data: {} });
});
