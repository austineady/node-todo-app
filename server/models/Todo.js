const mongoose = require('mongoose');

// Model
// mongoose.model takes two arguments
// first: string name
// second: object schema
// Schema Docs: http://mongoosejs.com/docs/schematypes.html
module.exports = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});