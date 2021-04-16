'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var Order = require('../models/order');
var dateFormat = require('dateformat');
const nodemailer = require("nodemailer");

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
    order.status = 'Pending'
    //Hacemos uso de la libreria DateFormat de node, para poder modificar la apariencia de la fecha
    var date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    order.created_at = date;
    order.completed_at = 'null';

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

function updateOrder(req, res){ //Deberemos +
    var orderId = req.params.id;
    var update = req.body;  

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

function getOrders(req, res){
    var userId = req.params.user;

    if(!userId){
        var encontrado = Order.find({}).sort('dateTime');//Sacar todos los pedidos de la bbdd, nos ayudara para tener una vision general en el MASTER
    }else{
        var encontrado = Order.find({user_id: userId}).sort('dateTime');//Sacar los de un usuario concreto, para uqe pueda ver sus pedidos y su estado
    }
    //sustitucion de los datos extraidos
    encontrado.populate({path: 'users'}).exec((err, orders) => {
        if(err){
            res.status(500).send({message: 'Error en el getPedidos'});
        }else{
            if(!orders){
                res.status(404).send({message: 'No hay pedidos'}); 
            }else{
                res.status(200).send({orders}); 
            }
        }
    });
}


async function sendProcessEmail(req, res){

    var name = req.body.username;
    var from = req.body.from;
    var message = 'Su pedido se encuentra ahora mismo a la espera de ser procesado por cualquiera de nuestros funcionarios. Cuando este totalmente listo, será informado con otro correo. GRACIAS';
    var to = req.body.email;

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "empresion34@gmail.com",
            pass: "e-mpresion345"
        } 
    });

    var mailOptions = {
        from: from,
        to: to, 
        subject: name+' pedido realizado !',
        text: message
    }


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("error is "+error);
            res.status(500).send({message: 'Error en la peticion'});; 
        } 
       else {
           console.log('Email sent: ' + info.response);
           res.status(200).send({message: 'Email enviado'});
        }
       });
}





module.exports = {
    getOrder,
    generateOrder,
    updateOrder,
    getOrders,
    sendProcessEmail
};