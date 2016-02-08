'use strict';

function options_controller (mongoose) {
  var Pool = mongoose.model('Pool');
  var Option = mongoose.model('Option');

  this.new = function(req, res){
    Pool.find({}, function(err, pools){
      res.render('options/new', { pools : pools, 
                                  poolId : req.params.pool_id });
    });
  }

  this.create = function (req, res){
    //var poolId = req.params.pool_id;
    var title = req.body.title;
    var poolId = req.body.pool;

    Pool.findOne({_id : poolId}, function(err, pools){
      var option = new Option({ title: title,
                                _pool : poolId});

      option.save(function (err, option) {
        if (err) 
          return console.error(err);

        res.end('Cadastrado com sucesso')
      });
    });
  }
}

module.exports = options_controller;
