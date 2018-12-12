 const {MongoClient,ObjectID} = require('mongodb');

 MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {

    if(err){
        return console.log("Unable to connect to Mongo - 27017")
    }
    console.log("Successfully connected")

    db.close();
 })