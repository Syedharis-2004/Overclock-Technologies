const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [120, 'Title cannot be more than 120 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  features: {
    type: [String],
    default: []
  },
  benefits: {
    type: [String],
    default: []
  },
  icon: {
    type: String,
    default: 'Code'
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

module.exports = mongoose.model('Service', ServiceSchema);
