const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

// Config
const config = require('./config');
const PORT = process.env.PORT || config.port || 5000;

// Models
const { mongoose } = require('./db/mongoose');
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
  });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.status(200).send();
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(PORT, () => {
  console.log(`Started on port ${ PORT }`);
});

module.exports = {
  app
};