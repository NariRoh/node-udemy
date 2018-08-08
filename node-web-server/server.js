const express = require("express");
const hbs = require('hbs')

var app = express();

// This lets us set some various express related configurations
app.set('view engine', 'hbs');
// To add a middleware: app.use takes the middleware function you want to use
  // express.static takes the absolute path to the folder you want to serve up
  // __dirname stores the path to your projects directory
app.use(express.static(__dirname + '/public'));

// HTTP get request: url, function to run
app.get("/", (req, res) => {
	// res.send("<h1>Hello Express!</h1>");
	// To send JSON object
  res.render("home.hbs", {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  })
});

app.get("/about", (req, res) => {
  // render lets you render any of the templates you have set up with your current view engine
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get("/bad", (req, res) => {
	res.send({
		errorMessage: "Unable to handle request"
	});
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
