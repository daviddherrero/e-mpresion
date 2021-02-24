'use strict'

var express = require('express');
var UserController = require('../controllers/user');

'use strict'

//Los ficheros de esta carpeta rutas, nos permitiran generar las rutas para llamar a los métodos de nuestros controladores
var express = require('express');
var UserController = require('../controllers/user');    //Cargamos en la variable el controlador del user

var api = express.Router();    //Nos permite mediante express crear rutas api REST
var auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');  //Nos va a permitir trabjar en http con ficheros, mandarlos y manejarlos
//Debemos crear un middleware para tratamiento de ficheros

api.get('/probando-controlador',auth.ensuredAuth, UserController.pruebas);  //La peticion pasa por el método ensured para comprobar que tiene permiso de autenticacion
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', auth.ensuredAuth,  UserController.updateUser);  //Si queremos pedir id en ruta obligatorio -> /:id?

module.exports = api;