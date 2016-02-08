var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

module.exports = function() {
  var schema = new Schema({
    title : String,
    slug_title : String,
    options : [{ type: Schema.Types.ObjectId, ref: 'Option' }]
  });

  /*schema.methods.options = function () {
    var Option = mongoose.model('Option');

    Option.find({pool_id : this._id }, function(err, options){
      console.log(JSON.stringify(options));
      return options;
    });
  }*/

  mongoose.model('Pool', schema);
}