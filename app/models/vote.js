var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

module.exports = function() {
  var schema = new Schema({
    _option: { type: String, ref: 'Option' }
  });

  mongoose.model('Vote', schema);
}