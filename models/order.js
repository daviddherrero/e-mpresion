'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = Schema({
	user_id: {type: Schema.ObjectId, ref: 'User'},	//Foreign key que conecta con el user que hizo este pedido
	file: String,	//Vamos a tratar con un unico archivo en un primer lugar
	status: String,
	create_at:  Date,
	completed_at: Date
	
});

module.exports = mongoose.model('Order', OrderSchema);