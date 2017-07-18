require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT;

// DB
const { mongoose } = require('./db/mongoose');

const app = express();

// Tell express to use body-parser middleware
app.use(bodyParser.json());

app.use(require('./controllers'));

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

module.exports = {
  app
};
