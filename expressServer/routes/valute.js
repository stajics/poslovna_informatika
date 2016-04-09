var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
  connection.query('SELECT * FROM valute JOIN drzava ON valute.drzava = drzava.sifra_drzave', function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({
      data: rows
    });
  });
});

router.post('/', function(req, res) {
  connection.query('INSERT INTO valute ( ID_valute, zvanicna_sifra, naziv, domicilna, drzava) VALUES("' +
    req.body.ID_valute +
    '","' + req.body.zvanicna_sifra +
    '","' + req.body.naziv +
    '","' + req.body.domicilna +
    '","' + req.body.drzava +
    '")',
    function(err, rows, fields) {
      if (err) throw err;
      res.status(200).send({
        data: [req.body]
      });
    });
});


router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE valute SET zvanicna_sifra="' +
   req.body.zvanicna_sifra +
   '",naziv="' + req.body.naziv +
   '",domicilna="' + req.body.domicilna +
  '" WHERE ID_valute="' + req.body.ID_valute +
  '"AND drzava="' + req.body.drzava +
  '"AND zvanicna_sifra="' + req.body.oldzvanicna_sifra +
  '"AND naziv="' + req.body.oldnaziv +
  '"AND domicilna="' + req.body.olddomicilna +
   '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    var newRowQuerry = 'SELECT * FROM valute JOIN drzava ON valute.drzava = drzava.sifra_drzave WHERE valute.ID_valute="' + req.body.ID_valute + '" AND valute.drzava="' + req.body.drzava + '"';
    console.log("QUERRY: " + newRowQuerry);
    connection.query(newRowQuerry, function(err, rows, fields) {
      res.status(200).send({
        data: rows
      });
    });
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM valute WHERE ID_valute="' + req.body.ID_valute + '" AND drzava="' + req.body.drzava + '"';
  console.log("QUERRY: " + querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send(rows);
  });
});


module.exports = router;
