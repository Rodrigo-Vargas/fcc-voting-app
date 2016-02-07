'use strict';

var PoolsController = require(process.cwd() + '/app/controllers/pools_controller.js');

module.exports = function (app, db) {
  var poolsController = new PoolsController(db);

  app.route('/')
    .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
    });

  app.route('/signup')
    .get(function (req, res) {      
      res.render('signup')})
    .post(function (req, res){
      var name = req.body.name;
      var password = req.body.password;

      var users = db.collection('users');

      var userInsertObject = {'name' : name, 'password' : password}

      users.insert(userInsertObject, function (err) {
         if (err) {
            throw err;
            res.end('Erro ao cadastrar')
         }

         res.end('Cadastrado com sucesso')
      });      
    });

  app.route('/login')
    .get(function (req, res){
      res.render('login');
    })
    .post(function(req, res){
      var name = req.body.name;
      var password = req.body.password;

      var users = db.collection('users');

      users.findOne({"name" : name, "password" : password}, {}, function (err, doc){
        if (err)
          throw err;

        if (doc == null)
          res.end('Login incorreto')
        else
          res.redirect('/pools')

        res.end(JSON.stringify(doc));
      });
    });

    /* Pools */

  app.route('/pools')
    .get(poolsController.index);

  app.route('/pools/new')
    .get(poolsController.new)
    .post(poolsController.create);

  app.get('/pool/:slug_title', poolsController.show);
};
