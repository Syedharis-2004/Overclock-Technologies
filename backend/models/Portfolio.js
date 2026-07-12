const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please specify category (e.g., Web, Mobile, AI)']
  },
  technologies: {
    type: [String],
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  liveDemoUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
