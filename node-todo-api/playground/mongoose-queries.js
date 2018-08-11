const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// const id = "5b6d11c3125ca9343ebb31bc3";
const userId = "5b6bd2df93f3fe1e5ea9c00c";

// // 2nd way to check if it's valid before we run the query
// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
//     // mongoose automatically converts id to ObjectID
// }).then(todos => {
//     console.log("Todos", todos);
// });

// Todo.findOne({
//     _id: id
//     // mongoose automatically converts id to ObjectID
// }).then(todo => {
//     console.log("Todo", todo);
// });

// Todo.findById(id)
//     .then(todo => {
//         // 👇 This to handle non-exist ID
//         if (!todo) {
//             return console.log("Id not found");
//         }
//         console.log("Todo By Id", todo);
//         // 👇 This to handle invalid ID (it's not a correct form of the id) - Cast to ObjectId failed for value...
//         // there is another way to handle this kind of error
//     })
//     .catch(err => console.log(err));

User.findById(userId)
    .then(user => {
        if (!user) {
            return console.log("User not found");
        }
        console.log("User by Id", user);
    }, (err) => {
    console.log(err)
  });
