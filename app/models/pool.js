var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

module.exports = function() {
  var schema = new Schema({
    title: String,
    slug_title: String
  });

  mongoose.model('Pool', schema);
}