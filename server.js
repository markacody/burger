var express = require('express');
var bodyParser = require('body-parser');
var override = require('method-override');

//CREATE SERVER OBJECT and ASSIGN PORT
var app = express();

var PORT = process.env.PORT || 3000;

//MIDDLEWARE - intercept incoming data for parsing
//Serve static files from the public directory
app.use(express.static(process.cwd() + "/public"));

//Parse data posted from a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

//Announce the use of handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//ROUTES - required routes to api and html
var routes = require("./controllers/burgers_controllers.js");
app.use("/", routes);

//START APP SERVER and bind to the port number
app.listen(PORT, function(){
    console.log('App listening on PORT: '+PORT);
});
