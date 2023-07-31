const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  Address: {
    type: String, 
    required: true
  },
 Zone: {
    type: String, 
    required: true
  },
  resetToken: String
});

module.exports = mongoose.model('User', userSchema);
