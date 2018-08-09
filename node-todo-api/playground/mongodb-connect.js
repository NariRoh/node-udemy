// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

// var obj = new ObjectID();
// console.log(obj);
/*
  * To start database server
    mongo/bin >> ./mongod --dbpath ~/mongo-data

  * To connect DB server
    mongo/bin >> ./mongo

  [ - collections
    { - document
      _id: askdjflsdjflaskjdf, - field
      name: 'hello',
      email: 'hello@there.com'
    },
    { - document
      _id: ......
    }
  ] 

  To connect the database
  1st arg: a string, the url where your database lives
  2nd arg: a callback function which gets fired after the connection has either succeeded or failed
*/
MongoClient.connect(
	"mongodb://localhost:27017/TodoApp",
	(err, client) => {
		if (err) {
			return console.log("Unable to connect to MongoDB server");
		}
    console.log("Connected to MongoDB server");
    const db = client.db('TodoApp');

    // 👇 takes only one arg, a string name for the collection you wanna insert into
    // db.collection('TodoS').insertOne({
    //   /* 👆 lets you insert a new document into your collection
    //   // 1st arg: an object, various key value pairs to store
    //    2nd arg: a callback function getting fired when things either fail or go well */
    //   text: 'Something to do',
    //   completed: false
    // }, (err, result) => {
    //   if (err) {
    //     return console.log('Unable to insert todo, err');
    //   }
    //   console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //   name: 'Nari',
    //   age: 25,
    //   location: 'Mexico city'
    // }, (err, result) => {
    //   if (err) {
    //     return console.log("Unable to insert todo", err);
    //   }
    //   console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close();
	}
);

