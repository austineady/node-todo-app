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

  // db.collection('Todos').find({ completed: false }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

    // db.collection('Todos').find({
    //   _id: new ObjectID('596aa4071c92743be2273021')
    // }).toArray().then((docs) => {
    //   console.log('Todos');
    //   console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //   console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find({
    //   _id: new ObjectID('596aa4071c92743be2273021')
    // }).count().then((count) => {
    //   console.log(`Todos count: ${ count }`);
    // }, (err) => {
    //   console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({ name: 'Austin' }).toArray().then((docs) => {
      console.log(JSON.stringify(docs, undefined, 2));
    });
  // Close connection to mongodb
  // db.close();
});
