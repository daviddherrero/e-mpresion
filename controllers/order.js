'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var Order = require('../models/order')

//Cargamos los modulos fs y path para poder trabajar con sistemas de ficheros y con los paths
var fs = require('fs');
var path = require('path');

function getOrder(req, res){
    var orderId = req.params.id;

    Order.findById(orderId).populate({path: 'user'}).exec((err, order) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!order){
                res.status(404).send({message: 'No existe el pedido'});
            }else{
                res.status(200).send({order});
            }
        }
    });  //Conseguir el elemento cuyo id sea el buscado en el path order


}

function generateOrder(req, res){
    var order = new Order();  //Creamos el objeto order

    var params = req.body;  //Parametros que nos llegan en la peticion

    order.user_id = params.user_id;
    order.file = 'null';
    order.dateTime = new Date();

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

function updateOrder(req, res){
    var orderId = req.params.id;
    var update = req.body;  //Datos a actualizar

    Order.findByIdAndUpdate(orderId, update, (err, userUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar el pedido'});
        }else{
            if(!userUpdated){
                res.status(404).send({userUpdated});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });
}



module.exports = {
    getOrder,
    generateOrder,
    updateOrder
};