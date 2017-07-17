const mongoose = require('mongoose');
const validator = require('validator');

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
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minLength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});
