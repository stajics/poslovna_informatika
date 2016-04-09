var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
//  connection.query('SELECT *,DATE_FORMAT(datum,"%Y-%m-%d")AS datum,DATE_FORMAT(primenjuje_se_od,"%Y-%m-%d")AS primenjuje_se_od FROM kurs_u_valuti JOIN kursna_lista ON kurs_u_valuti.redni_broj = kursna_lista.ID_kursne_liste JOIN valute ON kurs_u_valuti.osnovna_valuta=valute.ID_valute JOIN valute ON kurs_u_valuti.prema_valuti=valute.ID_valute', function(err, rows, fields) {
var querry = 'SELECT kurs_u_valuti.redni_broj,kurs_u_valuti.kupovni,kurs_u_valuti.srednji,kurs_u_valuti.prodajni,kurs_u_valuti.osnovna_valuta,v.naziv,kurs_u_valuti.prema_valuti,valute.naziv AS naziv_prema_valuti,DATE_FORMAT(datum,"%Y-%m-%d")AS datum,DATE_FORMAT(primenjuje_se_od,"%Y-%m-%d")AS primenjuje_se_od,kurs_u_valuti.kursna_lista'+
' FROM kurs_u_valuti'+
' JOIN kursna_lista ON kurs_u_valuti.kursna_lista = kursna_lista.ID_kursne_liste'+
' JOIN valute v ON kurs_u_valuti.osnovna_valuta=v.ID_valute JOIN'+
' valute ON kurs_u_valuti.prema_valuti=valute.ID_valute';
connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({
      data: rows
    });
  });
});

router.post('/', function(req, res) {
  connection.query('INSERT INTO kurs_u_valuti ( redni_broj, kupovni, srednji, prodajni, osnovna_valuta, prema_valuti, kursna_lista) VALUES("' +
    req.body.redni_broj +
    '","' + req.body.kupovni +
    '","' + req.body.srednji +
    '","' + req.body.prodajni +
    '","' + req.body.osnovna_valuta +
    '","' + req.body.prema_valuti +
    '","' + req.body.kursna_lista +
    '")',
    function(err, rows, fields) {
      if (err) throw err;
      var newRowQuerry = 'SELECT kurs_u_valuti.redni_broj,kurs_u_valuti.kupovni,kurs_u_valuti.srednji,kurs_u_valuti.prodajni,kurs_u_valuti.osnovna_valuta,v.naziv,kurs_u_valuti.prema_valuti,valute.naziv AS naziv_prema_valuti,DATE_FORMAT(datum,"%Y-%m-%d")AS datum,DATE_FORMAT(primenjuje_se_od,"%Y-%m-%d")AS primenjuje_se_od,kurs_u_valuti.kursna_lista'+
      ' FROM kurs_u_valuti'+
      ' JOIN kursna_lista ON kurs_u_valuti.kursna_lista = kursna_lista.ID_kursne_liste'+
      ' JOIN valute v ON kurs_u_valuti.osnovna_valuta=v.ID_valute JOIN'+
      ' valute ON kurs_u_valuti.prema_valuti=valute.ID_valute' +
      ' WHERE kurs_u_valuti.redni_broj="' + req.body.redni_broj +
      '" AND kurs_u_valuti.osnovna_valuta="'+ req.body.osnovna_valuta +
      '" AND kurs_u_valuti.prema_valuti="'+ req.body.prema_valuti +
      '" AND kurs_u_valuti.kursna_lista="'+ req.body.kursna_lista + '"';
      console.log("QUERRY: " + newRowQuerry);
      connection.query(newRowQuerry, function(err, rows, fields) {
        res.status(200).send({
          data: rows
        });
      });
    });
});


router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE kurs_u_valuti SET kupovni="' +
   req.body.kupovni +
   '",srednji="' + req.body.srednji+
   '",prodajni="' + req.body.prodajni +
  '" WHERE redni_broj="' + req.body.redni_broj +
  '"AND kursna_lista="' + req.body.kursna_lista +
  '"AND osnovna_valuta="' + req.body.osnovna_valuta +
  '"AND prema_valuti="' + req.body.prema_valuti +
  '"AND kupovni="' + req.body.oldkupovni +
  '"AND srednji="' + req.body.oldsrednji +
  '"AND prodajni="' + req.body.oldprodajni +
   '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    var newRowQuerry = 'SELECT kurs_u_valuti.redni_broj,kurs_u_valuti.kupovni,kurs_u_valuti.srednji,kurs_u_valuti.prodajni,kurs_u_valuti.osnovna_valuta,v.naziv,kurs_u_valuti.prema_valuti,valute.naziv AS naziv_prema_valuti,DATE_FORMAT(datum,"%Y-%m-%d")AS datum,DATE_FORMAT(primenjuje_se_od,"%Y-%m-%d")AS primenjuje_se_od,kurs_u_valuti.kursna_lista'+
    ' FROM kurs_u_valuti'+
    ' JOIN kursna_lista ON kurs_u_valuti.kursna_lista = kursna_lista.ID_kursne_liste'+
    ' JOIN valute v ON kurs_u_valuti.osnovna_valuta=v.ID_valute JOIN'+
    ' valute ON kurs_u_valuti.prema_valuti=valute.ID_valute' +
    ' WHERE kurs_u_valuti.redni_broj="' + req.body.redni_broj +
    '" AND kurs_u_valuti.osnovna_valuta="'+ req.body.osnovna_valuta +
    '" AND kurs_u_valuti.prema_valuti="'+ req.body.prema_valuti +
    '" AND kurs_u_valuti.kursna_lista="'+ req.body.kursna_lista + '"';
    console.log("QUERRY: " + newRowQuerry);
    connection.query(newRowQuerry, function(err, rows, fields) {
      res.status(200).send({
        data: rows
      });
    });
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM kurs_u_valuti WHERE redni_broj="' + req.body.redni_broj +
   '" AND kursna_lista="' + req.body.kursna_lista +
   '" AND osnovna_valuta="' + req.body.osnovna_valuta +
    '" AND prema_valuti="' + req.body.prema_valuti + '"';
  console.log("QUERRY: " + querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send(rows);
  });
});


module.exports = router;
