const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  
    name: {
      type: String,
      trim: true
    },

    comment:{
      type: String,
      trim: true
    }
})

module.exports = mongoose.model('Comments',CommentSchema);