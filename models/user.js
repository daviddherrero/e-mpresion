'use strict'

//Crearemos la primera entidad del modelo --> Entidad Usuario

//Cargamos mongoose para poder acceder a la bbdd
var mongoose = require('mongoose');
//Nos permitira trabajar con datos de tipo schema, que al guardar datos nos permitira guardarlos en una coleccion concreta
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name: String,
	username: String,
	email: String,
	password: String,
	role: String,
	image: String,
});

//Para usar el objeto fuera de este archivo, debemos exportar el archivo
module.exports = mongoose.model('User', UserSchema);	//User sera el nombre de la clase del modelo