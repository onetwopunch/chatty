var Schema = require('./schema');
var mongoose = require('mongoose');

var historySchema = new Schema({
  message: String,
  nick: String,
  created_at: {type: Date},
  updated_at: {type: Date},
});
historySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});
var History = mongoose.model('History', historySchema);

module.exports = History;
