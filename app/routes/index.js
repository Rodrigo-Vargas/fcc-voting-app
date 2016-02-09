'use strict';

var PoolsController = require(process.cwd() + '/app/controllers/pools_controller.js');
var UsersController = require(process.cwd() + '/app/controllers/users_controller.js');
var OptionsController = require(process.cwd() + '/app/controllers/options_controller.js');
var VotesController = require(process.cwd() + '/app/controllers/votes_controller.js');

module.exports = function (app, mongoose, passport) {
  var poolsController = new PoolsController(mongoose);
  var users_controller = new UsersController(mongoose);
  var options_controller = new OptionsController(mongoose);
  var votes_controller = new VotesController(mongoose);

  // Assim como qualquer middleware, é quintessencial chamarmos next()
  // Se o usuário estiver autenticado
  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }

  app.route('/')
    .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
    });

  /* Pools */

  app.get('/pools', isAuthenticated, poolsController.index);

  app.get('/pools/new', poolsController.new)
  app.post('/pools/new', poolsController.create);

  app.get('/pool/:slug_title', poolsController.show);

  /* Options */

  app.get('/pool/:pool_id/options/new', options_controller.new)
  app.post('/pool/:pool_id/options/new', options_controller.create)

  /* Votes */
  app.get('/pool/:pool_id/option/:option_id/vote', votes_controller.vote);

/* Requisição GET para página de LOGIN. */
  app.get('/', function(req, res) {
    // Mostra a página de Login com qualquer mensagem flash, caso exista
    res.render('index', { message: req.flash('message') });
  });

  /* Requisição GET para página de LOGIN. */
  app.get('/login', function(req, res) {
    // Mostra a página de Login com qualquer mensagem flash, caso exista
    res.render('users/login', { message: req.flash('message') });
  });
 
  /* Requisição POST para LOGIN */
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/pools',
    failureRedirect: '/login',
    failureFlash : true
  }));
 
  /*Requisição GET para página de Registro */
  app.get('/signup', function(req, res){
    res.render('users/register',{message: req.flash('message')});
  });
 
  /* Requisição POST para Registros */
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/pools',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* Manipula a saída */
  app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
