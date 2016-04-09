var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
  connection.query('SELECT ukidanje.*,DATE_FORMAT(datum_ukidanja,"%Y-%m-%d")AS datum_ukidanja, racuni_pravnih_lica.broj_racuna  FROM ukidanje JOIN racuni_pravnih_lica ON ukidanje.racuni_pravnih_lica = racuni_pravnih_lica.ID_racuna', function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({
      data: rows
    });
  });
});

router.post('/', function(req, res) {
  console.log(req.body.datum_ukidanja);
  connection.query('CALL `myDatabase`.`ukidanje_racuna`(' + req.body.ID_ukidanja + ',"' +
   req.body.datum_ukidanja + '",' + req.body.sredstva_se_prenose_na_racun +
    ',' + req.body.racuni_pravnih_lica + ',@x)', function (err, rows, fields){
    if (err) throw err;
    res.status(200).send({
              data: rows
              });
  });
});

function isRacunVazeci(ID_racuna) {
  var ret = 0;
  var querryDone = false;
  connection.query('CALL `myDatabase`.`isRacunVazeci`(' + ID_racuna + ')', (err, rows, fields) => {
    if (err) throw err;
    ret = rows[0][0].vazeci;
    return ret;
  });

}

router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE ukidanje SET datum_ukidanja="' +
    req.body.datum_ukidanja +
    '",sredstva_se_prenose_na_racun="' + req.body.sredstva_se_prenose_na_racun +
    '" WHERE ID_ukidanja="' + req.body.ID_ukidanja +
    '"AND racuni_pravnih_lica="' + req.body.racuni_pravnih_lica +
    '"AND datum_ukidanja="' + req.body.olddatum_ukidanja +
    '"AND sredstva_se_prenose_na_racun="' + req.body.oldsredstva_se_prenose_na_racun +
    '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    var newRowQuerry = 'SELECT ukidanje.*,DATE_FORMAT(datum_ukidanja,"%Y-%m-%d")AS datum_ukidanja, racuni_pravnih_lica.broj_racuna  FROM ukidanje JOIN racuni_pravnih_lica ON ukidanje.racuni_pravnih_lica = racuni_pravnih_lica.ID_racuna WHERE ukidanje.ID_ukidanja="' + req.body.ID_ukidanja + '" AND ukidanje.racuni_pravnih_lica="' + req.body.racuni_pravnih_lica + '"';
    console.log("QUERRY: " + newRowQuerry);
    connection.query(newRowQuerry, function(err, rows, fields) {
      res.status(200).send({
        data: rows
      });
    });
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM ukidanje WHERE ID_ukidanja="' + req.body.ID_ukidanja + '" AND racuni_pravnih_lica="' + req.body.racuni_pravnih_lica + '"';
  console.log("QUERRY: " + querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    var ponistiUkidanjeRacunaQuerry = 'UPDATE racuni_pravnih_lica SET vazeci=1 WHERE ID_racuna="' + req.body.racuni_pravnih_lica + '"';
    connection.query(ponistiUkidanjeRacunaQuerry, function(err, rows, fields) {});
    res.status(200).send(rows);
  });
});


module.exports = router;
