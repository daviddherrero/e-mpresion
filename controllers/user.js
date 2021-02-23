'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res){
    res.status(200).send({
        message: 'Probando controller de user'
    });
}

function saveUser(req, res){
    var user = new User();  //Creamos el objeto user

    var params = req.body;  //Parametros que nos llegan en la peticion

    user.name = params.name;
    user.username = params.username;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if(params.password){
        //Encriptar la contraseña y guardarla
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;
            if(user.name != null && user.username != null && user.email != null){
                //Guardamos el usuario
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: 'No se ha registrado el usuario, fallo'});  
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });
            }else{
                res.status(200).send({message: 'Introduce todos los campos de usuario'});
            }
        });
    }else{
        res.status(500).send({message: 'Introduce la contraseña'});
    }
}

function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!user){
                res.status(404).send({message: 'No existe el usuario'});
            }else{
                //Comprobar la contraseña
                bcrypt.compare(password, user.password, function(err, check){
                    if(check){
                        //Devolver los datos del usuario logueado
                        if(params.gethash){
                            //Devolver un token de jwt
                            res.status(200).send({token: jwt.createToken(user)})
                        }else{
                            res.status(200).send({user})
                        }
                    }else{
                        res.status(404).send({message: 'No ha podido loguearse el usuario'});
                    }
                });
            }
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    loginUser
};