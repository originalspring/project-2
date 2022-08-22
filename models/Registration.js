const mongoose = require('mongoose');

const userInformation = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  psw: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Registration', userInformation);
