// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Youtube',
  dateStrings: true
});

module.exports = connection

// A simple SELECT query
// connection.query(
//   'SELECT * FROM `users`',
//   function (err, results, fields) {
//     console.log(results); 
//     console.log(fields);
//   }
// );