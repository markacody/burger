//REQUIRE EXPRESS and CREATE A ROUTER
var express = require('express');
var router = express.Router();

//IMPORT THE MODEL
var burger = require('../models/burger.js');

//CREATE ROUTES - for each applicable http method and path - associate the request with a mysql transaction and associate the response with a display using handlebars with html
//NOTE: The get route looks up all burgers, assembles the data returned in a handlebars object, and responds using the render method on results and passing in the handlebars object
router.get('/', function(req,res){
    burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log('Controller says the handlebars object is: ' + hbsObject);
        res.render('index', hbsObject);
    });
});
//NOTE: The post route adds a burger, passing column names as an array and creating a matching array of values by parsing the incoming data with the body method. This route responds with a redirect to the index page whereupon selectAll is run again on arrival
router.post("/", function(req, res) {
  burger.insertOne([
    "burger_name", "devoured", "date"
  ], [
    req.body.burger_name, req.body.devoured, req.body.date
  ], function() {
    res.redirect("/");
  });
});
//NOTE: The put route updates the devoured status of the burger, using the id and the params method to locate the row and the body method to update with a new value
router.put("/:id", function(req, res) {
  var devoured = "id = " + req.params.id;
    
    console.log("Burger was devoured: ", devoured);
    //NOTE: invoke the function, specify the column and new value in an object literal, then specify the id of the row to be updated with the variable declared and assigned above, devoured. In a callback function redirect to the index whereupon the select all function is run again.
    burger.updateOne({
        devoured: req.body.value
        }, devoured, function() {
    res.redirect("/");
  });
});

//EXPORT THE ROUTER
module.exports = router;