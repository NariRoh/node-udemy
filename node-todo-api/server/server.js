const express = require("express");
const bodyParser = require("body-parser");
// 👆 is going to take the JSON and convert it into an object attaching it onto the request object

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();

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
			res.send({ todos });
		},
		err => {
			res.status(400).send(err);
		}
	);
});

app.listen(3000, () => {
	console.log("Started on port 3000");
});

module.exports = { app };
