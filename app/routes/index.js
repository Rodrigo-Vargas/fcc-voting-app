'use strict';

var PoolsController = require(process.cwd() + '/app/controllers/pools_controller.js');
var UsersController = require(process.cwd() + '/app/controllers/users_controller.js');
var OptionsController = require(process.cwd() + '/app/controllers/options_controller.js');

module.exports = function (app, mongoose) {
  var poolsController = new PoolsController(mongoose);
  var users_controller = new UsersController(mongoose);
  var options_controller = new OptionsController(mongoose);

  app.route('/')
    .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
    });

  app.route('/signup')
    .get(users_controller.signup)
    .post(users_controller.create);

  app.route('/login')
    .get(users_controller.login)
    .post(users_controller.login_attempt);

    /* Pools */

  app.route('/pools')
    .get(poolsController.index);

  app.route('/pools/new')
    .get(poolsController.new)
    .post(poolsController.create);

  app.get('/pool/:slug_title', poolsController.show);

  app.get('/pool/:pool_id/options/new', options_controller.new)
  app.post('/pool/:pool_id/options/new', options_controller.create)
};
