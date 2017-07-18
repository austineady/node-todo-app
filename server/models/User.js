const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
// ------------------------------

// override what comes back from toJSON
UserSchema.methods.toJSON = function() {
  // instances get called with instance as this
  // user is the individual user
  const user = this;
  const userObject = user.toObject(); // convert mongoose object to regular object

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  // need to get access and token values
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

// Password hashing mongoose middleware
UserSchema.pre('save', function(next) {
  // Must provide next argument and call it
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    // move along
    next();
  }
});

// Model methods
// -----------------------------------
UserSchema.statics.findByToken = function(token) {
  // models get called with model as this
  // User is all users
  const User = this;
  let decoded;

  // jwt.verify throws and error if anything goes wrong
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  // If successfull, find User
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token, // allows you to access nested objects
    'tokens.access': 'auth'
  });
};

// Model
// mongoose.model takes two arguments
// first: string name
// second: object schema
// Schema Docs: http://mongoosejs.com/docs/schematypes.html
module.exports = mongoose.model('User', UserSchema);
