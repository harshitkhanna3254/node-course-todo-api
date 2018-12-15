const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then( (doc) => {
        res.send(doc);
    }, (error) => {
        res.send(error)
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then( (docs) => {
        res.send(docs)
    }, (e) => {res.send(e)})
})


app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id))
       return res.send("ID not a valid ObjectID")

    Todo.findById(id).then( (doc) => {
        if(!doc)
            return res.send("No document found")
            else
                res.send({todo: doc})
    }, (e) => {res.send(e)})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});