//Archivo para utilizar express para crear el servidor
'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app  = express();

//Cargar rutas


app.use(bodyParser.urlencoded({extended:false}));	//Necesario para que bodyparser funcione
app.use(bodyParser.json()); //Convierte a json lo que nos devuelven las peticiones http
//Configurar cabeceras http

//Cargar rutas base
app.get('/pruebas', function(req, res){
    res.status(200).send({message: 'Bienvenido al curso de victorroblesweb.es'});
});


module.exports = app;	//Podemos usar express dentro de otros ficheros que incluyan app