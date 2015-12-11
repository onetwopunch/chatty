var mongoose = require('mongoose');
var config = require('../config/database');

mongoose.connect(config.databaseUrl);

module.exports = mongoose.Schema;
