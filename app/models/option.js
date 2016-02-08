var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

module.exports = function() {
  var schema = new Schema({
    title: String,
    _pool: { type: String, ref: 'Pool' },
    votes: Number
  });

  mongoose.model('Option', schema);
}