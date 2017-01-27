//REQUIRE MySQL NODE PACKAGE
var mysql = require("mysql");

//DEFINE CONNECTION
var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "burgers_db"
});

//CREATE CONNECTION
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//EXPORT CONNECTION
module.exports = connection;