'use strict' //Usar instrucciones de los nuevos estandares de js

//mongoose es el intermediario que permite copmunicarnos con la bd
var mongoose = require('mongoose');
var app = require('./app');	//Leemos el fichero app, con todos los datos de express
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/e-mpresion', (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("La conexión a la base de datos funciona correctamente");
		app.listen(port, function(){
			console.log("Servidor del api rest de musica escuchanfo en http://localhost:" + port);
		});

	}
});