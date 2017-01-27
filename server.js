var express = require('express');
var bodyParser = require('body-parser');
var override = require('method-override');

//CREATE SERVER OBJECT and ASSIGN PORT
var app = express();

var PORT = process.env.PORT || 3300;

//MIDDLEWARE - intercept incoming data for parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


//ROUTES - required routes to api and html


//START APP SERVER and bind to the port number
app.listen(PORT, function(){
    console.log('App listening on PORT: '+PORT);
});
