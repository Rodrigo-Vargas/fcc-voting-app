'use strict';

var express = require('express');
var expressValidator = require('express-validator');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var mongo = require('mongodb');
var routes = require('./app/routes/index.js');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var app = express();

var mongoUrl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/rvg-voting-app";
var port = process.env.PORT || 3000;

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
  app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  app.use(cookieParser('secret'));
  app.use(flash());

  app.use(session({secret: 'minhaChaveSecreta'}));
  app.use(passport.initialize());
  app.use(passport.session());

  var Vote = require('./app/models/vote');
  var newVote = new Vote;

  var Option = require('./app/models/option');
  var newOption = new Option;

  var Pool = require('./app/models/pool');
  var newPool = new Pool;

  require('./config/passport')(passport);

  routes(app, mongoose, passport);

  app.listen(port , function () {
    console.log('Node.js listening on port '+ port + '...');
  });
});
