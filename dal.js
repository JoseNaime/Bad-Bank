const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

// Connect to mongo
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    try{
        db = client.db('banking');

        console.log('Connected to MongoDB');
    } catch(err){
        console.log(err);
    }
});

// Create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password,  balance: 0, deposits: [], withdraws: []};
        collection.insertOne(doc, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    })
}

// Get all users
function getAll(){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        collection.find({}).toArray((err, result) => {
            err ? reject(err) : resolve(result);
        });
    });
}

module.exports = {
    create,
    getAll
}