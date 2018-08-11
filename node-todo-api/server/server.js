const express = require("express");
const bodyParser = require("body-parser");
// 👆 is going to take the JSON and convert it into an object attaching it onto the request object
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    // console.log(req.body);
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then(
        doc => {
            res.send(doc);
        },
        err => {
            res.status(400).send(err);
        }
    );
});

app.get("/todos", (req, res) => {
    Todo.find().then(
        todos => {
            res.send({todos});
        },
        err => {
            res.status(400).send(err);
        }
    );
});

// GET /todos/id
app.get("/todos/:id", (req, res) => {
    const id = req.params.id;

    // valid id using isValid
    if (!ObjectID.isValid(id)) {
        return res.status(404).send(); // send with no data
    }

    Todo.findById(id)
        .then(todo => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        })
        .catch(err => {
            res.status(400).send();
        });
});

// Delete
app.delete('/todos/:id', (req, res) => {
    // get the id
    const id = req.params.id;

    // validate the id => not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    // remove todo by id
    Todo.findByIdAndRemove(id)
        // success
        .then(todo => {
            // if no doc, send 404: need to check if there is todo otherwise it'll be success but send null
            if (!todo) {
                return res.status(404).send();
            }
            // if doc, send doc back
            res.send({todo})
        })
        // error
            // 400 with empty body with 200
        .catch(err => res.send(400).send());
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };
