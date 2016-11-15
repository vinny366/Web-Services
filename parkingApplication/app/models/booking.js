var mongoose = require('mongoose');

var Bookings = mongoose.Schema({

    booking : {
        USERID        : String,
        LOTID         : String,
        SPOTID        : String,
        duration	  : String,
        cost 		  : String
    },    

});

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('Parkings', Bookings);
