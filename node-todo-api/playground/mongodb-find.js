const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  { useNewUrlParser: true },
	(err, client) => {
		if (err) {
			return console.log("Unable to connect to MongoDB server");
		}
    console.log("Connected to MongoDB server");
    const db = client.db('TodoApp');

    // .find() without arg, find all items.
    // toArray() returns a promise
    // db.collection('Todos').find({ 
    //   _id: new ObjectID('5b6b6c77ee889501b18abbc9')
    // }).toArray().then((docs) => {
    //   console.log('Todos');
    //   console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //   console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //   console.log(`Todos count: ${count}`);
    // }, (err) => {
    //   console.log('Unable to fetch todos', err);
    // });
    db.collection('Users').find({name: 'Nari'}).toArray().then((docs) => {
      console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
      console.log('Unable to fetch users', err);
    });

    // client.close();
	}
);

