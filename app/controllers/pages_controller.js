'use strict';

function pages_controller () {  
  this.about = function (req, res) {      
    res.render('pages/about');
  }
}

module.exports = pages_controller;
