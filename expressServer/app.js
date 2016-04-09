

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/user');
var drzava = require('./routes/drzava');
var naseljeno_mesto = require('./routes/naseljeno_mesto');
var banka = require('./routes/banka');
var valute = require('./routes/valute');
var kursna_lista = require('./routes/kursna_lista');
var kurs_u_valuti = require('./routes/kurs_u_valuti');
var racuni_pravnih_lica = require('./routes/racuni_pravnih_lica');
var klijent = require('./routes/klijent');
var ukidanje = require('./routes/ukidanje');
var dnevno_stanje_racuna = require('./routes/dnevno_stanje_racuna');
var vrste_placanja = require('./routes/vrste_placanja');
var analitika_izvoda = require('./routes/analitika_izvoda');
var rtgs = require('./routes/rtgs');

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,PATCH,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin,Content-Type, X-Requested-With, Accept");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('etag');

app.use('/', index);
app.use('/users', users);
app.use('/drzava', drzava);
app.use('/naseljeno_mesto', naseljeno_mesto);
app.use('/banka', banka);
app.use('/valute', valute);
app.use('/kursna_lista', kursna_lista);
app.use('/kurs_u_valuti', kurs_u_valuti);
app.use('/racuni_pravnih_lica', racuni_pravnih_lica);
app.use('/klijent', klijent);
app.use('/ukidanje', ukidanje);
app.use('/dnevno_stanje_racuna', dnevno_stanje_racuna);
app.use('/vrste_placanja', vrste_placanja);
app.use('/analitika_izvoda', analitika_izvoda);
app.use('/rtgs', rtgs);
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
