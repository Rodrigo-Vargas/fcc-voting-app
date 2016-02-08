'use strict';

var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var mongo = require('mongodb');
var routes = require('./app/routes/index.js');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var app = express();

var mongoUrl = "mongodb://localhost:27017/clementinejs";

mongoose.connect(mongoUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to MongoDB on port 27017.');
  app.use('/public', express.static(process.cwd() + '/public'));
  app.use('/models', express.static(process.cwd() + '/app/models'));
  app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
  app.set('view engine', 'jade');
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));
  app.use(cookieParser('secret'));
  app.use(session({cookie: { maxAge: 60000 }}));
  app.use(flash());

  var Vote = require('./app/models/vote');
  var newVote = new Vote;

  var Option = require('./app/models/option');
  var newOption = new Option;

  var Pool = require('./app/models/pool');
  var newPool = new Pool;

   routes(app, mongoose);

   app.listen(3000, function () {
      console.log('Node.js listening on port 3000...');
   });
});
