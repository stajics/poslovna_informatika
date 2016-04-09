var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
  connection.query('SELECT kursna_lista.*,DATE_FORMAT(datum,"%Y-%m-%d")AS datum,DATE_FORMAT(primenjuje_se_od,"%Y-%m-%d")AS primenjuje_se_od, banka.naziv  FROM kursna_lista JOIN banka ON kursna_lista.banka = banka.ID_banke', function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({
      data: rows
    });
  });
});

router.post('/', function(req, res) {
  var insertQuerry ='INSERT INTO kursna_lista ( ID_kursne_liste, datum, broj_kursne_liste, primenjuje_se_od, banka) VALUES("' +
    req.body.ID_kursne_liste +
    '","' + req.body.datum +
    '","' + req.body.broj_kursne_liste +
    '","' + req.body.primenjuje_se_od +
    '","' + req.body.banka +
    '")';
    console.log("QUERRY: " + insertQuerry);
    connection.query(insertQuerry,function(err, rows, fields) {
      if (err) throw err;
      var newRowQuerry = 'SELECT kursna_lista.*,DATE_FORMAT(datum,"%Y-%m-%d")AS datum,DATE_FORMAT(primenjuje_se_od,"%Y-%m-%d")AS primenjuje_se_od, banka.naziv FROM kursna_lista JOIN banka ON kursna_lista.banka = banka.ID_banke WHERE kursna_lista.ID_kursne_liste="' + req.body.ID_kursne_liste + '" AND kursna_lista.banka="' + req.body.banka + '"';
      console.log("QUERRY: " + newRowQuerry);
      connection.query(newRowQuerry, function(err, rows, fields) {
        res.status(200).send({
          data: rows
        });
      });
    });
});


router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE kursna_lista SET datum="' +
   req.body.datum +
   '",broj_kursne_liste="' + req.body.broj_kursne_liste +
   '",primenjuje_se_od="' + req.body.primenjuje_se_od +
  '" WHERE ID_kursne_liste="' + req.body.ID_kursne_liste +
  '"AND banka="' + req.body.banka +
  '"AND datum="' + req.body.olddatum +
  '"AND broj_kursne_liste="' + req.body.oldbroj_kursne_liste +
  '"AND primenjuje_se_od="' + req.body.oldprimenjuje_se_od +
   '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    var newRowQuerry = 'SELECT kursna_lista.*,DATE_FORMAT(datum,"%Y-%m-%d")AS datum,DATE_FORMAT(primenjuje_se_od,"%Y-%m-%d")AS primenjuje_se_od, banka.naziv FROM kursna_lista JOIN banka ON kursna_lista.banka = banka.ID_banke WHERE kursna_lista.ID_kursne_liste="' + req.body.ID_kursne_liste + '" AND kursna_lista.banka="' + req.body.banka + '"';
    console.log("QUERRY: " + newRowQuerry);
    connection.query(newRowQuerry, function(err, rows, fields) {
      res.status(200).send({
        data: rows
      });
    });
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM kursna_lista WHERE ID_kursne_liste="' + req.body.ID_kursne_liste + '" AND banka="' + req.body.banka + '"';
  console.log("QUERRY: " + querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send(rows);
  });
});


module.exports = router;
