'use strict';

function votes_controller (mongoose) {
  var Vote = mongoose.model('Vote');
  var Option = mongoose.model('Option');

  this.vote = function (req, res){
    var optionId = req.params.option_id;
    
    var vote = new Vote({ _option : optionId});

    vote.save(function (err, vote) {
      if (err) 
        return console.error(err);

      Option.findOne({_id : optionId}, function(err, option){


        option.votes = option.votes + 1;

        option.save(function (err, option){
          if (err) {
          console.error(err);
          req.flash('info', 'Error on insert vote. Try again later.');
          }
          else
          {
            req.flash('info', 'Your vote has computed');
          }
          res.redirect('/pools');
        });  
      });
    });
  }
}

module.exports = votes_controller;
