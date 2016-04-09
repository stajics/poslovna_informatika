
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'srle111',
  database : 'myDatabase'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('You are now connected...');
});

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });

//connection.end();

module.exports = connection;
