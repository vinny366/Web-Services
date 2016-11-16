var mongoose = require('mongoose');

var timeSlotSchema = mongoose.Schema({
	from: {type: Date},
	to:{type: Date},
	status : {type: String}
})

// create the model for users and expose it to our app
module.exports = mongoose.model('TimeSlot', timeSlotSchema);
