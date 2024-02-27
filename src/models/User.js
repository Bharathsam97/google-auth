const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isAlphanumeric,
      message: 'Only alphanumeric characters are allowed.',
    },
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    },
  },
});

module.exports = mongoose.model('User', userSchema);
