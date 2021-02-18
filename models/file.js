'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = Schema({
	file_extension: String,
	file_name: String,
    file: String
	
});

module.exports = mongoose.model('File', FileSchema);