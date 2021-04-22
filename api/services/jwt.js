'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_empresion'; //Clave secreta para hashear 

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),   //momento de creacion del token
        exp: moment().add(30, 'days').unix()    //momento de expiracion del token (30 dias)
    };
    
    return jwt.encode(payload, secret);
};


