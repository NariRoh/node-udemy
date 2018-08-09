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

    // db.collection('Todos').findOneAndUpdate({
    //   _id: new ObjectID('5b6b9b389e6709a7a01f4466')
    // }, {
    //   $set: {
    //     completed: true
    //   }
    // }, {
    //   returnOriginal: false
    // }).then((result) => {
    //   console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('5b6b70e2dc6ba708d9a9c18d')
    }, {
      $set: {
        name: 'Nari'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    });

    // client.close();
	}
);

