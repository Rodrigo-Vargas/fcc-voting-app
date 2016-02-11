'use strict';

function pools_controller (mongoose) {
  var Pool = mongoose.model('Pool');
  var Option = mongoose.model('Option');

  this.index = function (req, res) {
    var user = req.user;
    Pool.find({}, function(err, pools) {
      res.render('pools/index', { pools:pools, 
                                  message: req.flash('info'), 
                                  user : user });
    });
  }

  this.my_pools = function (req, res){
    Pool.find({ user : req.user }, function(err, pools) {
      res.render('pools/my', {  pools:pools, 
                                message: req.flash('info'), 
                                user : req.user });
    });
  }

  this.new = function(req, res){
    res.render('pools/new')
  }

  this.create = function (req, res){
    req.checkBody('title', 'Invalid title').notEmpty();
    req.checkBody('slug_title', 'Invalid slug title').notEmpty();
    
    var errors = req.validationErrors();

    if (errors)
    {
      var errorList = "";
      errors.forEach(function(error){
        errorList += error.msg + ", "
      });

      req.flash('info', errorList);

      res.render('pools/new', { message : req.flash('info')});
      return;
    }

    var title = req.body.title;
    var slugTitle = req.body.slug_title;

    var pool = new Pool({ title : title,
                          slug_title : slugTitle,
                          user :  req.user });

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

    Pool.findOne(queryObject, {}, function (err, pool) {
      if (err) 
        throw err;

      var ownPool = false;

      if (req.user && req.user._id.toString() == pool.user.toString())
        ownPool = true;
      
      Option
      .find({ _pool: pool._id })
      .exec(function (err, options) {
        if (err) 
          return handleError(err);

        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        var facebookLink = "https://www.facebook.com/sharer/sharer.php?u=" + fullUrl;
        var twitterLink = "https://twitter.com/intent/tweet?&hashtags=voteplex&url=" + fullUrl;
        var googlePlusLink = "https://plus.google.com/share?url=" + fullUrl;
        
        res.render('pools/show', {  pool : pool,
                                    options : options,
                                    message: req.flash('info'),
                                    user: req.user,
                                    own_pool : ownPool,
                                    facebook_link : facebookLink,
                                    twitter_link : twitterLink,
                                    google_plus_link : googlePlusLink });
      });
    });
  }

  this.destroy = function (req, res){
    Pool.remove({ _id: req.params.id, user : req.user._id }, function(err, pool){
      if (err) {
        console.error(err);
        req.flash('info', 'Error on delete pool. Try again later.');
      }

      Pool.findById(pool._id, function (err, pool) {
        if (pool)
          req.flash('info', 'Pool not deleted');  
        else
          req.flash('info', 'Pool deleted successfully');  


        res.redirect('/pools');
      });
    });
  }
}

module.exports = pools_controller;
