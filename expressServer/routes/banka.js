var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
  connection.query('SELECT * FROM banka', function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({
      data: rows
    });
  });
});

router.post('/', function(req, res) {
  connection.query('INSERT INTO banka ( ID_banke, sifra_banke, PIB, naziv, adresa, email, web, telefon, fax, banka) VALUES("' +
    req.body.ID_banke +
    '","' + req.body.sifra_banke +
    '","' + req.body.PIB +
    '","' + req.body.naziv +
    '","' + req.body.adresa +
    '","' + req.body.email +
    '","' + req.body.web +
    '","' + req.body.telefon +
    '","' + req.body.fax +
    '","' + req.body.banka +
    '")',
    function(err, rows, fields) {
      if (err) throw err;
      res.status(200).send({
        data: [req.body]
      });
    });
});


router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE banka SET sifra_banke="' +
   req.body.sifra_banke +
   '",PIB="' + req.body.PIB +
   '",naziv="' + req.body.naziv +
   '",adresa="' + req.body.adresa +
   '",email="' + req.body.email +
   '",web="' + req.body.web +
   '",telefon="' + req.body.telefon +
   '",fax="' + req.body.fax +
   '",banka="' + req.body.banka +
  '" WHERE ID_banke="' + req.body.ID_banke +
  '" AND sifra_banke="' + req.body.oldsifra_banke +
  '"AND PIB="' + req.body.oldPIB +
  '"AND naziv="' + req.body.oldnaziv +
  '"AND adresa="' + req.body.oldadresa +
  '"AND web="' + req.body.oldweb +
  '"AND telefon="' + req.body.oldtelefon +
  '"AND fax="' + req.body.oldfax +
  '"AND banka="' + req.body.oldbanka +
   '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({
      data: [req.body]
    });
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM banka WHERE ID_banke="' + req.body.ID_banke + '"';
  console.log("QUERRY: " + querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send(rows);
  });
});


module.exports = router;
