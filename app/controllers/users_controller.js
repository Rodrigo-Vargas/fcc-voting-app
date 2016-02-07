'use strict';

function users_controller (db) {
   //var usersCollection = db.collection('users');

   this.signup = function (req, res) {      
      res.render('signup');
    }

    this.create = function (req, res){
      var name = req.body.name;
      var password = req.body.password;

      var userInsertObject = {'name' : name, 'password' : password}

      usersCollection.insert(userInsertObject, function (err) {
         if (err) {
            throw err;
            res.end('Erro ao cadastrar')
         }

         res.redirect('/pools');
         // Todo: add a feedback message
      });      
    }

    this.login = function (req, res){
      res.render('login');
    }

    this.login_attempt = function(req, res){
      var name = req.body.name;
      var password = req.body.password;

      usersCollection.findOne({"name" : name, "password" : password}, {}, function (err, doc){
        if (err)
          throw err;

        if (doc == null)
          res.end('Login incorreto')
        else
          res.redirect('/pools')

        res.end(JSON.stringify(doc));
      });
    }
}

module.exports = users_controller;
