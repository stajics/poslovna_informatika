var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');

/* GET users listing. */
router.get('/', function(req, res) {
  //  connection.query('SELECT *,DATE_FORMAT(datum,"%Y-%m-%d")AS datum,DATE_FORMAT(primenjuje_se_od,"%Y-%m-%d")AS primenjuje_se_od FROM kurs_u_valuti JOIN kursna_lista ON kurs_u_valuti.redni_broj = kursna_lista.ID_kursne_liste JOIN valute ON kurs_u_valuti.osnovna_valuta=valute.ID_valute JOIN valute ON kurs_u_valuti.prema_valuti=valute.ID_valute', function(err, rows, fields) {
  var querry = 'SELECT DISTINCT analitika_izvoda.*,DATE_FORMAT(datum_prijema,"%Y-%m-%d")AS datum_prijema,DATE_FORMAT(datum_valute,"%Y-%m-%d")AS datum_valute' +
    ' FROM analitika_izvoda' +
    ' JOIN valute ON analitika_izvoda.valute = valute.ID_valute OR analitika_izvoda.valute = ""' +
    ' JOIN naseljeno_mesto ON analitika_izvoda.naseljeno_mesto=naseljeno_mesto.sifra_mesta OR analitika_izvoda.naseljeno_mesto=""' +
    ' JOIN dnevno_stanje_racuna ON analitika_izvoda.dnevno_stanje_racuna=dnevno_stanje_racuna.broj_izvoda' +
    ' JOIN vrste_placanja ON analitika_izvoda.vrste_placanja=vrste_placanja.oznaka_vrste OR analitika_izvoda.vrste_placanja=""';
  console.log(querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send({
      data: rows
    });
  });

});

router.post('/', function(req, res) {
  var querry = 'CALL `myDatabase`.`create_analitika_izvoda`("'+
    req.body.broj_stavke +
    '","' + req.body.duznik_nalogodavac +
    '","' + req.body.svrha_placanja +
    '","' + req.body.poverilac_primalac +
    '","' + req.body.datum_prijema +
    '","' + req.body.datum_valute +
    '","' + req.body.racun_duznika +
    '","' + req.body.model_zaduzenja +
    '","' + req.body.poziv_na_broj_zaduzenja +
    '","' + req.body.racun_poverioca +
    '","' + req.body.model_odobrenja +
    '","' + req.body.poziv_na_broj_odobrenja +
    '","' + req.body.hitno +
    '","' + req.body.iznos +
    '","' + req.body.tip_greske +
    '","' + req.body.status +
    '","' + req.body.valute +
    '","' + req.body.vrste_placanja +
    '","' + req.body.naseljeno_mesto +
    '","' + req.body.dnevno_stanje_racuna+'")';
    console.log(querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.status(200).send({
      data: rows
    });
  });
});


router.patch('/', function(req, res) {
  var insertQuerry = 'UPDATE analitika_izvoda SET duznik_nalogodavac="' +
    req.body.duznik_nalogodavac +
    '",svrha_placanja="' + req.body.svrha_placanja +
    '",poverilac_primalac="' + req.body.poverilac_primalac +
    '",datum_prijema="' + req.body.datum_prijema +
    '",datum_valute="' + req.body.datum_valute +
    '",racun_duznika="' + req.body.racun_duznika +
    '",model_zaduzenja="' + req.body.model_zaduzenja +
    '",poziv_na_broj_zaduzenja="' + req.body.poziv_na_broj_zaduzenja +
    '",racun_poverioca="' + req.body.racun_poverioca +
    '",model_odobrenja="' + req.body.model_odobrenja +
    '",poziv_na_broj_odobrenja="' + req.body.poziv_na_broj_odobrenja +
    '",hitno="' + req.body.hitno +
    '",iznos="' + req.body.iznos +
    '",status="' + req.body.status +
    '",tip_greske="' + req.body.tip_greske +
    '" WHERE broj_stavke="' + req.body.broj_stavke +
    '"AND dnevno_stanje_racuna="' + req.body.dnevno_stanje_racuna +
    '"AND vrste_placanja="' + req.body.oldvrste_placanja +
    '"AND valute="' + req.body.oldvalute +
    '"AND naseljeno_mesto="' + req.body.oldnaseljeno_mesto +
    '"AND duznik_nalogodavac="' + req.body.oldduznik_nalogodavac +
    '"AND poverilac_primalac="' + req.body.oldpoverilac_primalac +
    '"AND datum_prijema="' + req.body.olddatum_prijema +
    '"AND datum_valute="' + req.body.olddatum_valute +
    '"AND racun_duznika="' + req.body.oldracun_duznika +
    '"AND model_zaduzenja="' + req.body.oldmodel_zaduzenja +
    '"AND poziv_na_broj_zaduzenja="' + req.body.oldpoziv_na_broj_zaduzenja +
    '"AND poziv_na_broj_odobrenja="' + req.body.oldpoziv_na_broj_odobrenja +
    '"AND hitno="' + req.body.oldhitno +
    '"AND iznos="' + req.body.oldiznos +
    '"AND status="' + req.body.oldstatus +
    '"AND tip_greske="' + req.body.oldtip_greske +
    '"';
  console.log("QUERRY: " + insertQuerry);
  connection.query(insertQuerry, function(err, rows, fields) {
    if (err) throw err;
    var newRowQuerry = 'SELECT analitika_izvoda.*,DATE_FORMAT(datum_prijema,"%Y-%m-%d")AS datum_prijema,DATE_FORMAT(datum_valute,"%Y-%m-%d")AS datum_valute' +
      ' FROM analitika_izvoda' +
      ' JOIN valute ON analitika_izvoda.valute = valute.ID_valute OR analitika_izvoda.valute =""' +
      ' JOIN naseljeno_mesto ON analitika_izvoda.naseljeno_mesto=naseljeno_mesto.sifra_mesta OR analitika_izvoda.naseljeno_mesto=""' +
      ' JOIN dnevno_stanje_racuna ON analitika_izvoda.dnevno_stanje_racuna=dnevno_stanje_racuna.broj_izvoda' +
      ' JOIN vrste_placanja ON analitika_izvoda.vrste_placanja=vrste_placanja.oznaka_vrste OR analitika_izvoda.vrste_placanja=""' +
      ' WHERE analitika_izvoda.dnevno_stanje_racuna="' + req.body.dnevno_stanje_racuna +
      '" AND analitika_izvoda.broj_stavke="' + req.body.broj_stavke + '"';
    console.log("QUERRY: " + newRowQuerry);
    connection.query(newRowQuerry, function(err, rows, fields) {
      res.status(200).send({
        data: rows
      });
    });
  });
});

router.delete('/', function(req, res) {
  var querry = 'DELETE FROM analitika_izvoda WHERE broj_stavke="' + req.body.broj_stavke +
    '" AND dnevno_stanje_racuna="' + req.body.dnevno_stanje_racuna + '"';
  console.log("QUERRY: " + querry);
  connection.query(querry, function(err, rows, fields) {
    if (err) throw err;
    res.status(200).send(rows);
  });
});


module.exports = router;
