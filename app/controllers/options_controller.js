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
    /* Validation */
    req.checkBody('title', 'Invalid title').notEmpty();
    req.checkParams('pool_id', 'Invalid slug title').notEmpty();

    var errors = req.validationErrors();

    if (errors)
    {
      var errorList = "";
      errors.forEach(function(error){
        errorList += error.msg + ", "
      });

      req.flash('info', errorList);

      res.render('options/new', { message : req.flash('info')});
      return;
    }

    /* ---- Validation ----- */

    var poolId = req.params.pool_id;
    var title = req.body.title;
    
    Pool.findOne({_id : poolId}, function(err, pool){
      var option = new Option({ title: title,
                                _pool : poolId,
                                votes : 0});

      option.save(function (err, option) {
        if (err) {
          console.error(err);
          req.flash('info', 'Error on insert option. Try again later.');
        }
        else
        {
          req.flash('info', 'Option inserted successfully');  
        }
        
        res.redirect('/pool/' + pool.slug_title);
      });
    });
  }
}

module.exports = options_controller;
