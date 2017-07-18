const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
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

// Create Instance Methods
UserSchema.methods.toJSON = function() {
  // override what comes back from toJSON
  const user = this;
  const userObject = user.toObject(); // convert mongoose object to regular object

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  // need to get access and token values
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

// Model
// mongoose.model takes two arguments
// first: string name
// second: object schema
// Schema Docs: http://mongoosejs.com/docs/schematypes.html
module.exports = mongoose.model('User', UserSchema);
