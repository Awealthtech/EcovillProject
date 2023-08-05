const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    validate: {
      validator: function (v) {
        // Use a regular expression to validate the email
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  bio: { type: String },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Use a regular expression to validate the phone number
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Format: xxx-xxx-xxxx`,
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  Address: {
    type: String,
    required: true,
  },
  Zone: {
    type: String,
    required: true,
  },
  resetToken: String,
});

module.exports = mongoose.model("User", userSchema);
