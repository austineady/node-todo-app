const mongoose = require('mongoose');

// Model
// mongoose.model takes two arguments
// first: string name
// second: object schema
// Schema Docs: http://mongoosejs.com/docs/schematypes.html
module.exports = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});