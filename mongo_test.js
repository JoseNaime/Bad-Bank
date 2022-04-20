const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  if (err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
  }else {
    console.log('Connected...');

    const dbName = 'mydb';
    const db = client.db(dbName);

    const name = 'John';
    const email = name + '@gmail.com';

    const collection = db.collection('customers');
    const doc = {name: name, email: email};
    collection.insertOne(doc, function(err, result) {
      if (err) {
        console.log('Error occurred while inserting document...\n', err);
      }else {
        console.log('Inserted document:\n', result);
      }
    });

  }
});