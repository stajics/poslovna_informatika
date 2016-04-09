var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
  connection.query('SELECT * FROM vrste_placanja', function(err, rows, fields) {
    if (err) throw err;
    console.log(JSON.stringify(rows));
    res.status(200).send({data: rows});
  });
});

router.post('/', function(req, res) {
  connection.query('INSERT INTO vrste_placanja ( oznaka_vrste, naziv_vrste_placanja) VALUES( "'+ req.body.oznaka_vrste +'","'+   req.body.naziv_vrste_placanja +'")', function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({data: [req.body]});
  });
});


router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE vrste_placanja SET naziv_vrste_placanja="'+ req.body.naziv_vrste_placanja +'" WHERE oznaka_vrste="'+ req.body.oznaka_vrste +'" AND naziv_vrste_placanja="' + req.body.oldnaziv_vrste_placanja + '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({data: [req.body]});
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM vrste_placanja WHERE oznaka_vrste="' + req.body.oznaka_vrste + '"';
  console.log("QUERRY: " + querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send(rows);
  });
});


module.exports = router;
