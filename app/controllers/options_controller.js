'use strict';

function options_controller (mongoose) {
    var Pool = mongoose.model('Pool', { title: String,
                                          slug_title: String });

    this.new = function(req, res){
      res.render('options/new')
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
}

module.exports = options_controller;
