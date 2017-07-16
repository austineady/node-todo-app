const mongoose = require('mongoose');

// tell mongoose to use built-in promise library
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:2000/TodoApp');
// mongoose will wait for a connection before running any db operations

module.exports = { mongoose };