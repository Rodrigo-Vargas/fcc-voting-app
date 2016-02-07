'use strict';

function pools_controller (db) {
   var poolsCollection = db.collection('pools');

   this.index = function (req, res) {
      poolsCollection.find({}, {}).toArray(function (err, result) {
        if (err) {
          throw err;
        } 

        res.render('pools/index', { pools:result });
      });
    }

    this.new = function(req, res){
      res.render('pools/new')
    }

    this.create = function (req, res){
      var title = req.body.title;
      var slugTitle = req.body.slug_title;

      var poolInsertObject = {'title' : title,
                              'slug_title' : slugTitle }

      poolsCollection.insert(poolInsertObject, function (err) {
         if (err) {
            throw err;
            res.end('Erro ao cadastrar')
         }

         res.end('Cadastrado com sucesso')
      });
    }

    this.show = function(req, res){
      var slug_title = req.params.slug_title;

      var queryObject = {"slug_title" : slug_title}

      poolsCollection.findOne(queryObject, {}, function (err, pool){
        if (err)
          throw err;

        res.render('pools/show', { pool : pool });
      });
    }
}

module.exports = pools_controller;
