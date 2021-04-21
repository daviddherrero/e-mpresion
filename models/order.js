'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = Schema({
	user_id: {type: Schema.ObjectId, ref: 'User'},	//Foreign key que conecta con el user que hizo este pedido
	created_at: Date,
	file: String,
	status: String,
	completed_at: Date

});

module.exports = mongoose.model('Order', OrderSchema);