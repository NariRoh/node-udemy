var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// var newTodo = new Todo({
//   text: 'Cook dinner',
// });

// // save() returns a promise
// newTodo.save().then((doc) => {
//   console.log('Saved doc :', doc);
// }, (err) => {
//   console.log('Unable to save todo');
// });

// var otherTodo = new Todo({
//   // mongoose casts the value to a string - boolean, number..
//   text: 'Something to do'
// });

// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log('Unable to save', err);
// });

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var newUser = new User({
  email: 'hello@hello.com'
});

newUser.save().then((doc) => {
  console.log('User saved', doc);
}, (err) => {
  console.log('Unable to save:', err);
});
