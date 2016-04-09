var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {

  connection.query('SELECT * FROM drzava', function(err, rows, fields) {
    if (err) throw err;
    console.log(JSON.stringify(rows));
    console.log(rows[0].id);
  });

  res.send('respond with a resource');
});

module.exports = router;
