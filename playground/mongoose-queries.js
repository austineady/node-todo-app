const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const Todo = require('./../server/models/Todo');

const id = '596bb5475333c274f5953474';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

// Returns an array that matches the query
Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

// Returns one document as an object
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

// Returns one document as an object
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch((e) => console.log(e));