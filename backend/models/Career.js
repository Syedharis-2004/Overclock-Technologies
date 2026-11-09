const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a job description']
  },
  department: {
    type: String,
    required: [true, 'Please specify department'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please specify location (e.g., Remote, On-site)'],
    trim: true
  },
  type: {
    type: String,
    default: 'Full-time',
    trim: true
  },
  requirements: {
    type: [String],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Career', CareerSchema);
