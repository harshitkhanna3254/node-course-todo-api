const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {

   if(err){
       return console.log("Unable to connect to Mongo - 27017")
   }
   console.log("Successfully connected")

//    db.collection('Todos').find().toArray().then( (docs) => {
//         console.log("Todos: ");
//         console.log(JSON.stringify(docs,undefined,2));
//    }, (err) => {
//        console.log("Unable to fetch todos");
//    })

db.collection('Todos').findOneAndDelete({_id: new ObjectID('5c1176ce26863495b9acf46f')}).then( (docs) => {
    console.log(docs);
})

   db.close();
})