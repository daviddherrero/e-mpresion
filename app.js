//Archivo para utilizar express para crear el servidor
'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app  = express();

//Cargar rutas de las llamadas rest
var user_routes = require('./routes/user');  //Rutas del controlador de user
var order_routes = require('./routes/order');   //Rutas del controlador de order

app.use(bodyParser.urlencoded({extended:false}));	//Necesario para que bodyparser funcione
app.use(bodyParser.json()); //Convierte a json lo que nos devuelven las peticiones http

//Configurar cabeceras http
/*
app.use((req, res, next) => {   //Permisos para acceso a nuestra api mediante cabeceras http
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});*/

//Cargar rutas base
app.use('/api', user_routes);   //Creamos ruta base, para añadir /api al principio de cada llamada a las rutas de user
app.use('/api', order_routes);


module.exports = app;	//Podemos usar express dentro de otros ficheros que incluyan app