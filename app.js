'use strict';

var express = require('express');
var path = require('path');

var gallery = require('./routes/index');
var stream = require('./routes/stream');
var apiStream = require('./api/stream');

// If --crons passed to command line, run the crons in /crons/index
var yargs = require('yargs')
  .usage('Usage: $0 --crons')
  .default('crons', false)
  .boolean('crons');

var argv = yargs.argv;
if (argv.crons) {
  require('./crons/index')();
  console.log('Crons activated');
}

// Server configuration
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', gallery);
app.use('/stream', stream);
app.use('/api/stream', apiStream);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

var port = process.env.PORT || 3000; // Specify a port if you wish
var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Raspberry Pi Camera Gallery running at http://%s:%s', host, port);
});

module.exports = app;