//Archivo para utilizar express para crear el servidor

'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app  = express();

//Cargar rutas
var user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({extended:false}));	//Necesario para que bodyparser funcione
app.use(bodyParser.json());


//Configurar cabeceras http

//Cargar rutas base
app.use('/api', user_routes);	//Introducimos delante de cada ruta de las user_routes el /api


module.exports = app;	//Podemos usar express dentro de otros ficheros que incluyan app