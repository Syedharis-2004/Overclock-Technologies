const Portfolio = require('../models/Portfolio');
const asyncHandler = require('../middlewares/async');
const mongoose = require('mongoose');

const isDBConnected = () => mongoose.connection.readyState === 1;

let inMemoryPortfolios = [
  {
    _id: 'pf-1',
    title: 'Enterprise AI Analytics Dashboard',
    category: 'AI & Data Solutions',
    description: 'Real-time predictive analytics dashboard processing 1M+ events per second for global SaaS enterprise.',
    technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'AWS'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    liveDemoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    createdAt: new Date()
  },
  {
    _id: 'pf-2',
    title: 'FinTech Mobile Banking Application',
    category: 'Mobile App Development',
    description: 'High-security mobile banking platform with instant payments, biometric login, and card management.',
    technologies: ['React Native', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    liveDemoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    createdAt: new Date()
  },
  {
    _id: 'pf-3',
    title: 'E-Commerce Global Logistics Platform',
    category: 'Web & Software Development',
    description: 'End-to-end supply chain management portal with automated inventory tracking and route optimization.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'GraphQL'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    liveDemoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    createdAt: new Date()
  }
];

// @desc    Get all portfolio projects
// @route   GET /api/portfolio
// @access  Public
exports.getPortfolios = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const portfolios = await Portfolio.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: portfolios.length,
        data: portfolios
      });
    } catch (err) {
      console.warn('DB query failed in getPortfolios, using fallback:', err.message);
    }
  }

  res.status(200).json({
    success: true,
    count: inMemoryPortfolios.length,
    data: inMemoryPortfolios
  });
});

// @desc    Get single portfolio project
// @route   GET /api/portfolio/:id
// @access  Public
exports.getPortfolio = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const portfolio = await Portfolio.findById(req.params.id);
      if (portfolio) {
        return res.status(200).json({ success: true, data: portfolio });
      }
    } catch (err) {
      console.warn('DB query failed in getPortfolio, using fallback:', err.message);
    }
  }

  const item = inMemoryPortfolios.find(p => p._id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Portfolio item not found' });
  }

  res.status(200).json({ success: true, data: item });
});

// @desc    Create new portfolio project
// @route   POST /api/portfolio
// @access  Private/Admin
exports.createPortfolio = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const portfolio = await Portfolio.create(req.body);
      return res.status(201).json({ success: true, data: portfolio });
    } catch (err) {
      console.warn('DB create failed in createPortfolio, using fallback:', err.message);
    }
  }

  const newItem = {
    _id: 'pf-' + Date.now(),
    ...req.body,
    createdAt: new Date()
  };
  inMemoryPortfolios.unshift(newItem);

  res.status(201).json({
    success: true,
    data: newItem
  });
});

// @desc    Update portfolio project
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
exports.updatePortfolio = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      let portfolio = await Portfolio.findById(req.params.id);
      if (portfolio) {
        portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        return res.status(200).json({ success: true, data: portfolio });
      }
    } catch (err) {
      console.warn('DB update failed in updatePortfolio, using fallback:', err.message);
    }
  }

  const index = inMemoryPortfolios.findIndex(p => p._id === req.params.id);
  if (index !== -1) {
    inMemoryPortfolios[index] = { ...inMemoryPortfolios[index], ...req.body };
    return res.status(200).json({ success: true, data: inMemoryPortfolios[index] });
  }

  const updatedItem = { _id: req.params.id, ...req.body };
  inMemoryPortfolios.unshift(updatedItem);
  res.status(200).json({ success: true, data: updatedItem });
});

// @desc    Delete portfolio project
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
exports.deletePortfolio = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const portfolio = await Portfolio.findById(req.params.id);
      if (portfolio) {
        await portfolio.deleteOne();
        return res.status(200).json({ success: true, data: {} });
      }
    } catch (err) {
      console.warn('DB delete failed in deletePortfolio, using fallback:', err.message);
    }
  }

  inMemoryPortfolios = inMemoryPortfolios.filter(p => p._id !== req.params.id);
  res.status(200).json({ success: true, data: {} });
});
