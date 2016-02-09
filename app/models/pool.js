var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

module.exports = function() {
  var schema = new Schema({
    title : String,
    slug_title : String,
    options : [{ type: Schema.Types.ObjectId, ref: 'Option' }],
    user : { type: Schema.Types.ObjectId, ref: 'User' }
  });

  mongoose.model('Pool', schema);
}