'use strict';

function users_controller (db) {
  
  this.signup = function(req, res){
    res.render('users/register',{message: req.flash('message')});
  }

  this.login = function(req, res) {
    res.render('users/login', { message: req.flash('message') });
  }

  this.signout = function(req, res) {
    req.logout();
    res.redirect('/');
  }
}

module.exports = users_controller;
