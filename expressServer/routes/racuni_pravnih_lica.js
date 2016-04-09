var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
//  connection.query('SELECT *,DATE_FORMAT(datum,"%Y-%m-%d")AS datum,DATE_FORMAT(primenjuje_se_od,"%Y-%m-%d")AS primenjuje_se_od FROM kurs_u_valuti JOIN kursna_lista ON kurs_u_valuti.redni_broj = kursna_lista.ID_kursne_liste JOIN valute ON kurs_u_valuti.osnovna_valuta=valute.ID_valute JOIN valute ON kurs_u_valuti.prema_valuti=valute.ID_valute', function(err, rows, fields) {
var querry = 'SELECT racuni_pravnih_lica.ID_racuna,racuni_pravnih_lica.broj_racuna,racuni_pravnih_lica.datum_otvaranja,DATE_FORMAT(datum_otvaranja,"%Y-%m-%d")AS datum_otvaranja,racuni_pravnih_lica.vazeci,racuni_pravnih_lica.banka,banka.naziv,racuni_pravnih_lica.klijent,klijent.ime,klijent.prezime,racuni_pravnih_lica.valute, valute.naziv AS naziv_valute'+
' FROM racuni_pravnih_lica'+
' JOIN banka ON racuni_pravnih_lica.banka = banka.ID_banke'+
' JOIN valute ON racuni_pravnih_lica.valute=valute.ID_valute '+
' JOIN klijent ON racuni_pravnih_lica.klijent=klijent.ID_klijenta';
connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({
      data: rows
    });
  });
});

router.post('/', function(req, res) {
  connection.query('INSERT INTO racuni_pravnih_lica ( ID_racuna, broj_racuna, datum_otvaranja, vazeci, banka, klijent, valute) VALUES("' +
    req.body.ID_racuna +
    '","' + req.body.broj_racuna +
    '","' + req.body.datum_otvaranja +
    '","' + req.body.vazeci +
    '","' + req.body.banka +
    '","' + req.body.klijent +
    '","' + req.body.valute +
    '")',
    function(err, rows, fields) {
      if (err) throw err;
      var newRowQuerry = 'SELECT racuni_pravnih_lica.ID_racuna,racuni_pravnih_lica.broj_racuna,racuni_pravnih_lica.datum_otvaranja,DATE_FORMAT(datum_otvaranja,"%Y-%m-%d")AS datum_otvaranja,racuni_pravnih_lica.vazeci,racuni_pravnih_lica.banka,banka.naziv,racuni_pravnih_lica.klijent,klijent.ime,klijent.prezime,racuni_pravnih_lica.valute, valute.naziv AS naziv_valute'+
      ' FROM racuni_pravnih_lica'+
      ' JOIN banka ON racuni_pravnih_lica.banka = banka.ID_banke'+
      ' JOIN valute ON racuni_pravnih_lica.valute=valute.ID_valute '+
      ' JOIN klijent ON racuni_pravnih_lica.klijent=klijent.ID_klijenta' +
      ' WHERE racuni_pravnih_lica.ID_racuna="' + req.body.ID_racuna +
      '" AND racuni_pravnih_lica.banka="'+ req.body.banka +
      '" AND racuni_pravnih_lica.klijent="'+ req.body.klijent +
      '" AND racuni_pravnih_lica.valute="'+ req.body.valute + '"';
      console.log("QUERRY: " + newRowQuerry);
      connection.query(newRowQuerry, function(err, rows, fields) {
        res.status(200).send({
          data: rows
        });
      });
    });
});


router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE racuni_pravnih_lica SET broj_racuna="' +
   req.body.broj_racuna +
   '",datum_otvaranja="' + req.body.datum_otvaranja+
   '",vazeci="' + req.body.vazeci +
  '" WHERE ID_racuna="' + req.body.ID_racuna +
  '"AND banka="' + req.body.banka +
  '"AND valute="' + req.body.valute +
  '"AND klijent="' + req.body.klijent +
  '"AND broj_racuna="' + req.body.oldbroj_racuna +
  '"AND datum_otvaranja="' + req.body.olddatum_otvaranja +
  '"AND vazeci="' + req.body.oldvazeci +
   '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    var newRowQuerry = 'SELECT racuni_pravnih_lica.ID_racuna,racuni_pravnih_lica.broj_racuna,racuni_pravnih_lica.datum_otvaranja,DATE_FORMAT(datum_otvaranja,"%Y-%m-%d")AS datum_otvaranja,racuni_pravnih_lica.vazeci,racuni_pravnih_lica.banka,banka.naziv,racuni_pravnih_lica.klijent,klijent.ime,klijent.prezime,racuni_pravnih_lica.valute, valute.naziv AS naziv_valute'+
    ' FROM racuni_pravnih_lica'+
    ' JOIN banka ON racuni_pravnih_lica.banka = banka.ID_banke'+
    ' JOIN valute ON racuni_pravnih_lica.valute=valute.ID_valute '+
    ' JOIN klijent ON racuni_pravnih_lica.klijent=klijent.ID_klijenta' +
    ' WHERE racuni_pravnih_lica.ID_racuna="' + req.body.ID_racuna +
    '" AND racuni_pravnih_lica.banka="'+ req.body.banka +
    '" AND racuni_pravnih_lica.klijent="'+ req.body.klijent +
    '" AND racuni_pravnih_lica.valute="'+ req.body.valute + '"';
    console.log("QUERRY: " + newRowQuerry);
    connection.query(newRowQuerry, function(err, rows, fields) {
      res.status(200).send({
        data: rows
      });
    });
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM racuni_pravnih_lica WHERE ID_racuna="' + req.body.ID_racuna +
   '" AND banka="' + req.body.banka +
   '" AND valute="' + req.body.valute +
    '" AND klijent="' + req.body.klijent + '"';
  console.log("QUERRY: " + querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send(rows);
  });
});


module.exports = router;
