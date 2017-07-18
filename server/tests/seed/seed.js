const { ObjectID } = require('mongodb');
const { Todo, User } = require('./../../models');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'userone@test.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'usertwo@test.com',
    password: 'userTwoPass'
  }
];

const todos = [
  { _id: new ObjectID(), text: 'First test todo' },
  { _id: new ObjectID(), text: 'Second test todo', completed: true, completedAt: 333 }
];

const populateTodos = done => {
  // reset db each time
  Todo.remove({})
    .then(() => {
      Todo.insertMany(todos);
    })
    .then(() => done());
};

const populateUsers = done => {
  // reset db each time
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]).then(() => {}).then(() => done());
  });
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};
