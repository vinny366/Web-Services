var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	displayName :{
		type: String
	},
	image : {
		type : String
	},
	email : {
		type :String
	},
	google :{
		type: Object
	},
	facebook:{
		type:Object
	},
	normalForm:{
		type:Object
	}

});

module.exports = mongoose.model('User', UserSchema);