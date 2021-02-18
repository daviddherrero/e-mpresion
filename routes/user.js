'use strict'

var express = require('express');
var UserController = require('../controllers/user');

'use strict'

//Los ficheros de esta carpeta rutas, nos permitiran generar las rutas para llamar a los métodos de nuestros controladores
var express = require('express');
var UserController = require('../controllers/user');    //Cargamos en la variable el controlador del user

var api = express.Router();    //Nos permite mediante express crear rutas api REST

api.get('/probando-controlador', UserController.pruebas);

module.exports = api;