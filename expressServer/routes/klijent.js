var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
  connection.query('SELECT * FROM klijent', function(err, rows, fields) {
    if (err) throw err;
    console.log(JSON.stringify(rows));
    res.status(200).send({data: rows});
  });
});

router.post('/', function(req, res) {
  connection.query('INSERT INTO klijent ( ID_klijenta, ime, prezime, pravno_lice) VALUES( "'+
   req.body.ID_klijenta +
   '","'+ req.body.ime +
   '","'+ req.body.prezime +
   '","'+ req.body.pravno_lice +
   '")',
   function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({data: [req.body]});
  });
});


router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE klijent SET ime="'+ req.body.ime +
  '", prezime="' + req.body.prezime +
  '", pravno_lice="' + req.body.pravno_lice +
  '" WHERE ID_klijenta="'+ req.body.ID_klijenta +'" AND ime="' + req.body.oldime +
  '" AND prezime="' + req.body.oldprezime +
  '" AND pravno_lice="' + req.body.oldpravno_lice +
  '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({data: [req.body]});
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM klijent WHERE ID_klijenta="' + req.body.ID_klijenta + '"';
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
    // res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Content-Type', 'application/json');
    res.status(200).send({data: rows});
  });
});

module.exports = router;
