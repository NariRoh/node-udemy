const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
// This lets us set some various express related configurations
app.set("view engine", "hbs");
// To add a middleware: app.use takes the middleware function you want to use
// __dirname stores the path to your projects directory

// next exists so you can tell express that when your middleware function is done
// req: everything comes from the client
app.use((req, res, next) => {
	var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
	next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// express.static takes the absolute path to the folder you want to serve up
app.use(express.static(__dirname + "/public"));

// first arg: name of helper, second arg: function
hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
	return text.toUpperCase();
});
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
