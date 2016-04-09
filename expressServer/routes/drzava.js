var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
//   INNER JOIN Customers
// ON Orders.CustomerID=Customers.CustomerID;
  connection.query('SELECT * FROM drzava', function(err, rows, fields) {
    if (err) throw err;
    console.log(JSON.stringify(rows));
    // res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Content-Type', 'application/json');
    res.status(200).send({data: rows});
  });
});

router.post('/', function(req, res) {
  connection.query('INSERT INTO drzava ( sifra_drzave, naziv_drzave) VALUES( "'+ req.body.sifra_drzave +'","'+   req.body.naziv_drzave +'")', function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({data: [req.body]});
  });
});


router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE drzava SET naziv_drzave="'+ req.body.naziv_drzave +'" WHERE sifra_drzave="'+ req.body.sifra_drzave +'" AND naziv_drzave="' + req.body.oldnaziv_drzave + '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({data: [req.body]});
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM drzava WHERE sifra_drzave="' + req.body.sifra_drzave + '"';
  console.log("QUERRY: " + querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

router.get('/a', function(req, res) {
  connection.query('CALL `myDatabase`.`test_procedure`("Italija")', function(err, rows, fields) {
    if (err) throw err;
    console.log(JSON.stringify(rows));
  });
});

module.exports = router;
