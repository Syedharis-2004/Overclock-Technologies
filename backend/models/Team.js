const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  role: {
    type: String,
    required: [true, 'Please add a role or designation']
  },
  bio: {
    type: String
  },
  imageUrl: {
    type: String
  },
  linkedin: {
    type: String
  },
  twitter: {
    type: String
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

module.exports = mongoose.model('Team', TeamSchema);
