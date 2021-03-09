'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = Schema({
	user_id: String,	//Foreign key que conecta con el user que hizo este pedido
	file: String	//Vamos a tratar con un unico archivo en un primer lugar
	
});

module.exports = mongoose.model('Order', OrderSchema);