'use strict';

var PoolsController = require(process.cwd() + '/app/controllers/pools_controller.js');
var UsersController = require(process.cwd() + '/app/controllers/users_controller.js');
var OptionsController = require(process.cwd() + '/app/controllers/options_controller.js');
var VotesController = require(process.cwd() + '/app/controllers/votes_controller.js');
var PagesController = require(process.cwd() + '/app/controllers/pages_controller.js');

module.exports = function (app, mongoose, passport) {
  var poolsController = new PoolsController(mongoose);
  var usersController = new UsersController(mongoose);
  var optionsController = new OptionsController(mongoose);
  var votesController = new VotesController(mongoose);
  var pagesController = new PagesController(mongoose);

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next(); 
    res.redirect('/login');
  }

  app.get('/', isAuthenticated, poolsController.index);

  /* Pools */

  app.get('/pools', poolsController.index);
  app.get('/mypools', isAuthenticated, poolsController.my_pools)

  app.get('/pools/new', poolsController.new)
  app.post('/pools/new', isAuthenticated, poolsController.create);
  app.get('/pool/:id/delete', isAuthenticated, poolsController.destroy);
  app.get('/pool/:slug_title', poolsController.show);

  /* Options */

  app.get('/pool/:pool_id/options/new', isAuthenticated, optionsController.new)
  app.post('/pool/:pool_id/options/new', isAuthenticated, optionsController.create)

  /* Votes */
  app.get('/pool/:pool_id/option/:option_id/vote', votesController.vote);

  /* Login */

  app.get('/login', usersController.login);
 
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
  }));
 
  app.get('/signup', usersController.signup);
 
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  app.get('/signout', usersController.signout);

  app.get('/about', pagesController.about);
};
