const Career = require('../models/Career');
const asyncHandler = require('../middlewares/async');
const mongoose = require('mongoose');

const isDBConnected = () => mongoose.connection.readyState === 1;

let inMemoryCareers = [
  {
    _id: 'car-1',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    description: 'We are seeking an experienced Full Stack Engineer to lead architectural design and development of scalable web applications.',
    requirements: ['5+ years experience with React and Node.js', 'Experience with cloud deployments (AWS/Vercel)', 'Strong understanding of RESTful APIs and Microservices'],
    isActive: true,
    createdAt: new Date()
  },
  {
    _id: 'car-2',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our design team to craft beautiful, high-converting digital interfaces and interactive visual branding for clients.',
    requirements: ['Proficiency in Figma and Adobe Creative Suite', 'Strong portfolio demonstrating modern UI/UX design', 'Experience building web design systems'],
    isActive: true,
    createdAt: new Date()
  },
  {
    _id: 'car-3',
    title: 'AI / ML Specialist',
    department: 'AI Research',
    location: 'On-site',
    type: 'Full-time',
    description: 'Help develop custom machine learning models, LLM integrations, and intelligent automation solutions for enterprise clients.',
    requirements: ['Strong Python & PyTorch / TensorFlow background', 'Experience with NLP and Computer Vision', 'Proven track record of deploying ML models in production'],
    isActive: true,
    createdAt: new Date()
  }
];

// @desc    Get all careers
// @route   GET /api/careers
// @access  Public
exports.getCareers = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const careers = await Career.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: careers.length,
        data: careers
      });
    } catch (err) {
      console.warn('DB query failed in getCareers, using fallback:', err.message);
    }
  }

  res.status(200).json({
    success: true,
    count: inMemoryCareers.length,
    data: inMemoryCareers
  });
});

// @desc    Get single career
// @route   GET /api/careers/:id
// @access  Public
exports.getCareer = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const career = await Career.findById(req.params.id);
      if (career) {
        return res.status(200).json({ success: true, data: career });
      }
    } catch (err) {
      console.warn('DB query failed in getCareer, using fallback:', err.message);
    }
  }

  const item = inMemoryCareers.find(c => c._id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Job listing not found' });
  }

  res.status(200).json({ success: true, data: item });
});

// @desc    Create new career
// @route   POST /api/careers
// @access  Private/Admin
exports.createCareer = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const career = await Career.create(req.body);
      return res.status(201).json({ success: true, data: career });
    } catch (err) {
      console.warn('DB create failed in createCareer, using fallback:', err.message);
    }
  }

  const newItem = { _id: 'car-' + Date.now(), ...req.body, createdAt: new Date() };
  inMemoryCareers.unshift(newItem);
  res.status(201).json({ success: true, data: newItem });
});

// @desc    Update career
// @route   PUT /api/careers/:id
// @access  Private/Admin
exports.updateCareer = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      let career = await Career.findById(req.params.id);
      if (career) {
        career = await Career.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        return res.status(200).json({ success: true, data: career });
      }
    } catch (err) {
      console.warn('DB update failed in updateCareer, using fallback:', err.message);
    }
  }

  const index = inMemoryCareers.findIndex(c => c._id === req.params.id);
  if (index !== -1) {
    inMemoryCareers[index] = { ...inMemoryCareers[index], ...req.body };
    return res.status(200).json({ success: true, data: inMemoryCareers[index] });
  }

  const updatedItem = { _id: req.params.id, ...req.body };
  inMemoryCareers.unshift(updatedItem);
  res.status(200).json({ success: true, data: updatedItem });
});

// @desc    Delete career
// @route   DELETE /api/careers/:id
// @access  Private/Admin
exports.deleteCareer = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const career = await Career.findById(req.params.id);
      if (career) {
        await career.deleteOne();
        return res.status(200).json({ success: true, data: {} });
      }
    } catch (err) {
      console.warn('DB delete failed in deleteCareer, using fallback:', err.message);
    }
  }

  inMemoryCareers = inMemoryCareers.filter(c => c._id !== req.params.id);
  res.status(200).json({ success: true, data: {} });
});
