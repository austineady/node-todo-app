var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  
  Object.keys(config[env]).forEach(key => {
    process.env[key] = config[env][key];
  });
}

// if (env === 'development') {
//   process.env.PORT = 5000;
//   process.env.MONGODB_URI = 'mongodb://localhost:2000/TodoApp';
// } else if (env === 'test') {
//   process.env.PORT = 5000;
//   process.env.MONGODB_URI = 'mongodb://localhost:2000/TodoAppTest';
// }