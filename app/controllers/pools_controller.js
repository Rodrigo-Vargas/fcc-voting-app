'use strict';

function pools_controller (mongoose) {
  var Pool = mongoose.model('Pool');
  var Option = mongoose.model('Option');

  this.index = function (req, res) {
    Pool.find({}, function(err, pools) {
      res.render('pools/index', { pools:pools, message: req.flash('info') });
    });
  }

  this.new = function(req, res){
    res.render('pools/new')
  }

  this.create = function (req, res){
    var title = req.body.title;
    var slugTitle = req.body.slug_title;

    var pool = new Pool({ title : title,
                          slug_title : slugTitle });

    pool.save(function(err, pool){
      if (err) {
        console.error(err);
        req.flash('info', 'Error on insert pool. Try again later.');
      }
      else
      {
        req.flash('info', 'Pool inserted successfully');  
      }
      
      res.redirect('/pools');
    });
  }

  this.show = function(req, res){
    var slug_title = req.params.slug_title;

    var queryObject = {"slug_title" : slug_title};

    Pool.findOne(queryObject, 'title slug_title', function (err, pool) {
      if (err) 
        throw err;

      Option
      .find({ _pool: pool._id })
      .exec(function (err, options) {
        if (err) 
          return handleError(err);
        
        res.render('pools/show', {  pool : pool,
                                    options : options,
                                    message: req.flash('info') });
      });
    });
  }
}

module.exports = pools_controller;
