const express = require("express");

var app = express();

// To add a middleware: app.use takes the middleware function you want to use
  // express.static takes the absolute path to the folder you want to serve up
  // __dirname stores the path to your projects directory
app.use(express.static(__dirname + '/public'));

// HTTP get request: url, function to run
app.get("/", (req, res) => {
	// res.send("<h1>Hello Express!</h1>");
	// To send JSON object
	res.send({
		name: "Nari",
		likes: ["Biking", "Cities"]
	});
});

app.get("/about", (req, res) => {
	res.send("About page");
});

app.get("/bad", (req, res) => {
	res.send({
		errorMessage: "Unable to handle request"
	});
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
