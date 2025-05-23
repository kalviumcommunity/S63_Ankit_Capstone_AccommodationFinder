const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  roomsOwned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);