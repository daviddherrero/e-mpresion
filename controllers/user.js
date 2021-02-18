'use strict'

function pruebas(req, res){
    res.status(200).send({
        message: 'Probando controller de user'
    });
}

module.exports = {
    pruebas
};