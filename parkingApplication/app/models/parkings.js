var mongoose = require('mongoose');

var TimeSlot = mongoose.model('TimeSlot');
var parkingSchema = mongoose.Schema({
        Name         : String,
        GeoX         : String,
        GeoY         : String,
        capacity     : String,
        Spot1      : [{type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot', unique: true}],
        Spot2      : [{type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot', unique: true}],
        Spot3      : [{type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot', unique: true}],
        Spot4      : [{type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot', unique: true}],
        Spot5      : [{type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot', unique: true}]


});
 
// methods ======================  [Number],


// create the model for users and expose it to our app
module.exports = mongoose.model('Parkings', parkingSchema);
