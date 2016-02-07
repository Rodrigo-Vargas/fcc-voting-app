'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');

module.exports = function (app, db) {
  var clickHandler = new ClickHandler(db);

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

  app.route('pools')
    .get(function (req, res){
      res.render('pools')
    })
};
