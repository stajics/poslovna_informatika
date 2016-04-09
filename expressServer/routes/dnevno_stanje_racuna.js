var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
  connection.query('SELECT dnevno_stanje_racuna.*,DATE_FORMAT(datum_prometa,"%Y-%m-%d")AS datum_prometa, racuni_pravnih_lica.broj_racuna  FROM dnevno_stanje_racuna'+
  ' JOIN racuni_pravnih_lica ON dnevno_stanje_racuna.racuni_pravnih_lica = racuni_pravnih_lica.ID_racuna', function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({
      data: rows
    });
  });
});

router.post('/', function(req, res) {
  var insertQuerry ='INSERT INTO dnevno_stanje_racuna ( broj_izvoda, datum_prometa, predhodno_stanje, promet_u_korist, promet_na_teret,novo_stanje,racuni_pravnih_lica) VALUES("' +
    req.body.broj_izvoda +
    '","' + req.body.datum_prometa +
    '","' + req.body.predhodno_stanje +
    '","' + req.body.promet_u_korist +
    '","' + req.body.promet_na_teret +
    '","' + req.body.novo_stanje +
    '","' + req.body.racuni_pravnih_lica +
    '")';
    console.log("QUERRY: " + insertQuerry);
    connection.query(insertQuerry,function(err, rows, fields) {
      if (err) throw err;
      var newRowQuerry = 'SELECT dnevno_stanje_racuna.*,DATE_FORMAT(datum_prometa,"%Y-%m-%d")AS datum_prometa, racuni_pravnih_lica.broj_racuna  FROM dnevno_stanje_racuna'+
      '   JOIN racuni_pravnih_lica ON dnevno_stanje_racuna.racuni_pravnih_lica = racuni_pravnih_lica.ID_racuna WHERE dnevno_stanje_racuna.broj_izvoda="' + req.body.broj_izvoda + '" AND dnevno_stanje_racuna.racuni_pravnih_lica="' + req.body.racuni_pravnih_lica + '"';
      console.log("QUERRY: " + newRowQuerry);
      connection.query(newRowQuerry, function(err, rows, fields) {
        res.status(200).send({
          data: rows
        });
      });
    });
});


router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE dnevno_stanje_racuna SET datum_prometa="' +
   req.body.datum_prometa +
   '",predhodno_stanje="' + req.body.predhodno_stanje +
   '",promet_u_korist="' + req.body.promet_u_korist +
   '",promet_na_teret="' + req.body.promet_na_teret +
   '",novo_stanje="' + req.body.novo_stanje +
  '" WHERE broj_izvoda="' + req.body.broj_izvoda +
  '"AND racuni_pravnih_lica="' + req.body.racuni_pravnih_lica +
  '"AND datum_prometa="' + req.body.olddatum_prometa +
  '"AND predhodno_stanje="' + req.body.oldpredhodno_stanje +
  '"AND promet_u_korist="' + req.body.oldpromet_u_korist +
  '"AND promet_na_teret="' + req.body.oldpromet_na_teret +
  '"AND novo_stanje="' + req.body.oldnovo_stanje +
   '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    var newRowQuerry = 'SELECT dnevno_stanje_racuna.*,DATE_FORMAT(datum_prometa,"%Y-%m-%d")AS datum_prometa, racuni_pravnih_lica.broj_racuna  FROM dnevno_stanje_racuna'+
    ' JOIN racuni_pravnih_lica ON dnevno_stanje_racuna.racuni_pravnih_lica = racuni_pravnih_lica.ID_racuna WHERE dnevno_stanje_racuna.broj_izvoda="' + req.body.broj_izvoda + '" AND dnevno_stanje_racuna.racuni_pravnih_lica="' + req.body.racuni_pravnih_lica + '"';
    console.log("QUERRY: " + newRowQuerry);
    connection.query(newRowQuerry, function(err, rows, fields) {
      res.status(200).send({
        data: rows
      });
    });
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM dnevno_stanje_racuna WHERE broj_izvoda="' + req.body.broj_izvoda + '" AND racuni_pravnih_lica="' + req.body.racuni_pravnih_lica + '"';
  console.log("QUERRY: " + querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send(rows);
  });
});


module.exports = router;
