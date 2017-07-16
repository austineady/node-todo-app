// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// connect() method takes two arguments
// first: a string with the URL where your database lives
// second: a callback function
MongoClient.connect('mongodb://localhost:2000/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // findOneAndUpdate(filter, update, options, callback)
    db.collection('Todos').findOneAndUpdate(
      {
          _id: new ObjectID('596b713cae58084cd3a8fdda')
      },
      {
          $set: {
              completed: true
          }
      },
      {
          returnOriginal: false
      }).then(result => {
          console.log(result);
      });

    db.collection('Users').findOneAndUpdate(
      { name: 'Aaron' },
      {
        $set: { name: 'Austin' },
        $inc: { age : 1 }
      },
      { returnOriginal: false }
    ).then((result) => {
      console.log(result);
    });
    // db.close();
});
