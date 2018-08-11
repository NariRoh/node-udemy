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

    // // deleteMany
    // db.collection('Todos')
    //     .deleteMany({text: 'Eat lunch'})
    //     .then((result) => {
    //         console.log(result);
    //     });

    // // deleteOne
    // db.collection('Todos')
    //     .deleteOne({text: 'Eat lunch'})
    //     .then((result) => {
    //         console.log(result);
    //     });

    // // findOneAndDelete : getting data back
    // db.collection('Todos')
    //   .findOneAndDelete({completed: false})
    //   .then((result) => {
    //      console.log(result);
    //   });

    // db.collection('Users').deleteMany({name: 'Nari'})
    
    db.collection('Users').findOneAndDelete({ 
        _id: new ObjectID('5b6b7126f0076c0900a4ff5f')
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
    // client.close();
    }
);

