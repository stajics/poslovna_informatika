var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
  connection.query('SELECT * FROM naseljeno_mesto JOIN drzava ON naseljeno_mesto.drzava = drzava.sifra_drzave', function(err, rows, fields) {
    if (err) throw err;
    console.log(JSON.stringify(rows));
    //res.setHeader('Content-Type', 'application/json');
    res.status(200).send({
      data: rows
    });
  });
});

router.post('/', function(req, res) {
  var insertQuerry = 'INSERT INTO naseljeno_mesto ( sifra_mesta, naziv, PTToznaka, drzava) VALUES( "' + req.body.sifra_mesta + '","' + req.body.naziv + '","' + req.body.PTToznaka + '","' + req.body.drzava + '")';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    var newRowQuerry = 'SELECT * FROM naseljeno_mesto JOIN drzava ON naseljeno_mesto.drzava = drzava.sifra_drzave WHERE naseljeno_mesto.sifra_mesta="' + req.body.sifra_mesta + '" AND naseljeno_mesto.drzava="' + req.body.drzava + '"';
    console.log("QUERRY: " + newRowQuerry);
    connection.query(newRowQuerry, function(err, rows, fields) {
      res.status(200).send({
        data: rows
      });
    });
  });
});

router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE naseljeno_mesto SET naziv="' + req.body.naziv + '",PTToznaka="' + req.body.PTToznaka + '" WHERE sifra_mesta="' + req.body.sifra_mesta + '" AND drzava="' + req.body.drzava + '" AND naziv="' + req.body.oldnaziv + '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    var newRowQuerry = 'SELECT * FROM naseljeno_mesto JOIN drzava ON naseljeno_mesto.drzava = drzava.sifra_drzave WHERE naseljeno_mesto.sifra_mesta="' + req.body.sifra_mesta + '" AND naseljeno_mesto.drzava="' + req.body.drzava + '"';
    console.log("QUERRY: " + newRowQuerry);
    connection.query(newRowQuerry, function(err, rows, fields) {
      res.status(200).send({
        data: rows
      });
    });
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM naseljeno_mesto WHERE sifra_mesta="' + req.body.sifra_mesta + '" AND drzava="' + req.body.drzava + '"';
  console.log("QUERRY: " + querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

module.exports = router;
