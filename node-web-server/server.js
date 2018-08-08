const express = require("express");
const hbs = require("hbs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
// This lets us set some various express related configurations
app.set("view engine", "hbs");
// To add a middleware: app.use takes the middleware function you want to use
// express.static takes the absolute path to the folder you want to serve up
// __dirname stores the path to your projects directory
app.use(express.static(__dirname + "/public"));

// first arg: name of helper, second arg: function 
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
// HTTP get request: url, function to run
app.get("/", (req, res) => {
	// To send JSON object
	res.render("home.hbs", {
		pageTitle: "Home Page",
		welcomeMessage: "Welcome to my website"
	});
});

app.get("/about", (req, res) => {
	// render lets you render any of the templates you have set up with your current view engine
	res.render("about.hbs", {
		pageTitle: "About Page"
	});
});

app.get("/bad", (req, res) => {
	res.send({
		errorMessage: "Unable to handle request"
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
