const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    console.log(typeof(req.body.text));
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
        res.send({todos: docs})
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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id))
        return res.send("Not a valid ID");
    
    Todo.findByIdAndRemove(id).then((doc) => {
        if(!doc)
            return res.send("No todo of that ID present")
        res.send(doc)
    }).catch((error) => {
        res.send(error)
    })
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(typeof(JSON.parse(req.body.completed)));
    var body = _.pick(req.body, ['text', 'completed']);
    console.log(typeof(body.completed));

    if(!ObjectID.isValid(id))
        return res.send("Invalid Object ID");

        console.log( JSON.parse(body.completed));

    if(_.isBoolean(JSON.parse(body.completed)) && JSON.parse(body.completed)){
        body.completedAt = new Date().getTime();
    } else{
        body.completed = false;
        body.completedAt = null;
    }


    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then( (doc) => {
        if(!doc)
            return res.send("No todo of that id found")
        res.send({todo: doc})
    }).catch((err) => {
        res.send("Some error occured")
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});