const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const userInformation = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,  
    minlength: 4,
    maxlength: 15 
  },
  password: {
    type: String,
    minlength: 1
  },
  email: {
    type: String,
    minlength: 1
  },
});

userInformation.plugin(passportLocalMongoose); //also auto salt and hash password
module.exports = mongoose.model('Registration', userInformation);
