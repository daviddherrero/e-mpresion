'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var Order = require('../models/order')

//Cargamos los modulos fs y path para poder trabajar con sistemas de ficheros y con los paths
var fs = require('fs');
var path = require('path');

function getOrder(req, res){
    res.status(200).send({message: 'Accion getOrder'});
}

function generateOrder(req, res){
    var order = new Order();  //Creamos el objeto order

    var params = req.body;  //Parametros que nos llegan en la peticion

    order.user_id = params.user_id;
    order.file = 'null';

    order.save((err, orderStored) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!orderStored){
                res.status(404).send({message: 'No se ha generado el pedido'});
            }else{
                res.status(200).send({order: orderStored});
            }
        }
    });
}



module.exports = {
    getOrder,
    generateOrder

};