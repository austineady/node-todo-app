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

  // deleteMany
  // db.collection('Todos').deleteMany({ text: 'Eat lunch' }).then((result) => {
  //   console.log(result);
  // });

     db.collection('Users').deleteMany({ name: 'Austin' }).then((result) => {
       console.log(result);
     });
  // deleteOne
  // db.collection('Todos').deleteOne({ text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

     db.collection('Users').deleteOne({ _id: new ObjectID('596aa4c9f834cc3c6d31323d') }).then((result) => {
       console.log(result);
     });
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
  //   console.log(result);
  // });
  // Close connection to mongodb
  // db.close();
});
