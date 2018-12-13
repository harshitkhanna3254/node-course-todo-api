const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {

   if(err){
       return console.log("Unable to connect to Mongo - 27017")
   }
   console.log("Successfully connected")

   db.collection('Users').findOneAndUpdate(
       {name: 'Sakshi'},
       {$set: {name: 'Sakshi Singh'}, $inc: {age: 1}},
       {returnOriginal: false}
   ).then( (docs) => {
        console.log("The updated doc is: ")
        console.log(docs);
   })

   db.close();
})