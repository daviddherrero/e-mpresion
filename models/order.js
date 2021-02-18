'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = Schema({
	n_order: String,
	user_id: String,
	file_id: String,
	
});

module.exports = mongoose.model('Order', OrderSchema);