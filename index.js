'use strict' //Usar instrucciones de los nuevos estandares de js

//mongoose es el intermediario que permite comunicarnos con la bd
var mongoose = require('mongoose');
var app = require('./app');
//Configuracion de puerto `para nuestro servidor
var port = process.env.PORT || 3977;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/e-mpresion', (err, res) => {
	useNewUrlParser:true
	if(err){
		throw err;
	}else{
		console.log("La base de datos funciona correctamente");
		
		//Ponemos el servidor a escuchar
		app.listen(port, function(){
			console.log("Servidor del api rest de musica escuchanfo en http://localhost:" + port);
		})

	}
});