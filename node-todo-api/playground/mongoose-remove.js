const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// To delete everything
// Todo.remove({}).then(result => {
//     console.log(result);
// });

// Delete one. Both of below bring back doc
// Todo.findOneAndRemove()
// TOdo.findByIdAndRemove()

// Todo.findOneAndRemove({ _id: "5b6e834b14738d1bd17dc608" }).then(todo => {

// });

Todo.findByIdAndRemove("5b6e834b14738d1bd17dc608").then(todo => {
    console.log(todo)
});