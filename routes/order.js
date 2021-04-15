'use strict'

//Los ficheros de esta carpeta rutas, nos permitiran generar las rutas para llamar a los métodos de nuestros controladores
var express = require('express');
var OrderController = require('../controllers/order');    //Cargamos en la variable el controlador del user

var api = express.Router();    //Nos permite mediante express crear rutas api REST
var auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');  //Nos va a permitir trabjar en http con ficheros, mandarlos y manejarlos
//Debemos crear un middleware para tratamiento de ficheros
var md_upload = multipart({ uploadDir: './uploads/order'}); //Los ficheros, se van a subir a ./uploads/order

api.get('/getOrder/:id', auth.ensuredAuth, OrderController.getOrder);
api.post('/generateOrder', auth.ensuredAuth, OrderController.generateOrder);
api.put('/update-order/:id', auth.ensuredAuth,  OrderController.updateOrder);  //Si queremos pedir id en ruta obligatorio -> /:id?
api.get('/getOrders/:user?', auth.ensuredAuth, OrderController.getOrders);

module.exports = api;