const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');

// Config
const config = require('./config');

// Models
const Todo = require('./models/Todo');
const User = require('./models/User');

const app = express();

// Tell express to use body-parser middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos });
  }, (e) => {
    res.status(400).send(e);
  })
});

app.listen(config.port, () => {
  console.log(`Started on port ${ config.port }`);
});

module.exports = {
  app
};