const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title can not be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  features: {
    type: [String],
    required: true
  },
  benefits: {
    type: [String],
    required: true
  },
  icon: {
    type: String,
    default: 'DefaultIcon'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Service', ServiceSchema);
