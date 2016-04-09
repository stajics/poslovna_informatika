var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET home page. */

router.get('/', function(req, res) {
  res.status(200).render('index', { title: 'Express' });

  connection.query('SELECT * FROM drzava', function(err, rows, fields) {
    if (err) throw err;
    console.log(JSON.stringify(rows));
  });
});

module.exports = router;
