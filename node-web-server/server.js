const express = require("express");

var app = express();

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

app.listen(3000);
