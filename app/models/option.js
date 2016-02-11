var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

module.exports = function() {
  var schema = new Schema({
    title: String,
    _pool: { type: String, ref: 'Pool' },
    _user: { type: String, ref: 'User' },
    votes: Number
  });

  mongoose.model('Option', schema);
}