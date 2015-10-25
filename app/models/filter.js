var mongoose = require('mongoose');

module.exports = mongoose.model('Filter', {
	name : {type : String, default: ''},
	partNo : {type : String, default: ''},
	description : {type : String, default: ''}
});
