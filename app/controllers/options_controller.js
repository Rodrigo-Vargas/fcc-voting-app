'use strict';

function options_controller (mongoose) {
  var Pool = mongoose.model('Pool');

  this.new = function(req, res){
    Pool.find({}, function(err, pools){
      res.render('options/new', { pools : pools });
    });
  }

  this.create = function (req, res){
    var title = req.body.title;
    var slugTitle = req.body.slug_title;
    var pool = req.body.pool;

    var poolInsertObject = { 'title'      : title,
                             'slug_title' : slugTitle,
                             'pool'       : pool }

    poolsCollection.insert(poolInsertObject, function (err) {
       if (err) {
          throw err;
          res.end('Erro ao cadastrar')
       }

       res.end('Cadastrado com sucesso')
    });
  }
}

module.exports = options_controller;
