'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = Schema({
	n_order: String,
	username: String,
	file_id: String,
	
});

module.exports = mongoose.model('Order', OrderSchema);