// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID} = require('mongodb');

// connect() method takes two arguments
// first: a string with the URL where your database lives
// second: a callback function
MongoClient.connect('mongodb://localhost:2000/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // collection() method takes one argument,
  // the string of the collection name you want to insert into
  // insertOne method take two arguments
  // first: object of key value pairs to save
  // second: a callback function
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Austin',
  //   age: 25,
  //   location: 'Charlotte'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }

  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  // Object Id is a 12-byte value
  // first 4 are a timestamp
  // next 3 are a machine identifier
  // next 2 are process ID
  // next is a 3 byte counter
  // last is a random value

  // Close connection to mongodb
  db.close();
});
