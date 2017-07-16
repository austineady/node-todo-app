const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const Todo = require('./../server/models/Todo');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({ _id: '596bd42a240781a626e14d01' }).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('596bd42a240781a626e14d01').then((todo) => {
  console.log(todo);
});