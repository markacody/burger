//IMPORT THE MYSQL CONNECTION
var connection = require('./connection.js');

//ADD HELPER FUNCTIONS for SQL SYNTAX
//HELPER USED IN CREATE NEW ROWS...INSERT INTO
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

//HELPER USED IN UPDATES
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

//CREATE ONE OBJECT FOR ALL MYSQL FUNCTIONS
//the user must be able to:
//insert a new burger
//update a burger's devoured status from false to true
//get all burgers and see in one view
var orm = {
    insertOne: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }

      cb(result);
    });
  },
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
      cb(result);
    });
  },
    selectAll: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

//EXPORT THE ORM for use in the MODEL
module.exports = orm;