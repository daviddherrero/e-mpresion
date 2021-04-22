'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_empresion'; //Clave secreta para hashear 

exports.ensuredAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene la autenticacion necesaria'});
    }
    //Si tiene el header authorization..

    var token = req.headers.authorization.replace(/['"]+/g, '');    //Le quitamos las comillas simples y dobles por string vacio

    try{
        var payload = jwt.decode(token, secret);
        
        if(payload.exp <= moment().unix()){ //Si el objeto payload que hemos definido antes, viene con fecha de expiracion menor a la de hoy -> Caducado
            return res.status(401).send({message: 'El token ha expirado'});
        }
    }catch(ex){
        //console.log(ex);
        return res.status(403).send({message: 'El token no es valido'});
    }

    req.user = payload  //Rellenamos el user con los datos del payload
    next(); //Para salir del middleware y dar autorizacion para hacer lo que diga el método del controler
};