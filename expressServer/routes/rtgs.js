var express = require('express');
var router = express.Router();
var connection = require('../config/mysql');


router.post('/', function(req, res) {

  connection.query('CALL `myDatabase`.`genRTGS`('+req.body.ID_poruke+',"'+req.body.racun_primaoca+'","'+req.body.racun_duznika+'","'+req.body.iznos+'","'+req.body.svrha+'","'+req.body.banka_primaoca+'","'+req.body.banka_duznika+'")', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.status(200).send({data: rows});
  });
});

router.get('/izvodIzvoda:brRacuna', function(req, res) {
  console.log(req.params.brRacuna);
  connection.query('CALL `myDatabase`.`izvod_izvoda`("'+req.params.brRacuna+'")', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.status(200).send({data: rows});
  });
});

module.exports = router;
