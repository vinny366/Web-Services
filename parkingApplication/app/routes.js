// app/routes.js
var mongoose = require("mongoose");
var TimeSlot = require('./models/spot.js');
var ParkingLot = require('./models/parkings.js');
var db = mongoose.connection;
module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        // lod the db in test,txt initially
        res.render('index.ejs'); // load the index.ejs file

    });


//============= ==============LOGIN ===============================

    // show the login form
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    // =========== ==============SIGNUP ==============================
 
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

   // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

// ==============================PROFILE SECTION =====================
   app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
// ============================== LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
////////////////////////////FACEBOOK-------------------------

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
////////////////////////////FACEBOOK ENDS-------------------------

////////////////////////////GOOGLE STARTS-------------------------
 app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));
////////////////////////////GOOGLE ENDS-------------------------


//--------------------------- Populating Parking Lot--------------

app.post('/parkings/:lotName' ,function(req,res){
    var fromTime = req.body.from;
    var toTime = req.body.to;
    var date = req.body.date;
    console.log(req.body)
    ParkingLot.find({"Name" : req.params.lotName})
    .populate('Spot1 Spot2 Spot3 Spot4 Spot5')
    .exec(function(err, result) {
        console.log(result);
        console.log(err);
        res.send(result);
    });
    // console.log(allParkings)
    // console.log(allParkings.length)
})
app.get('/parkings', isLoggedIn , function(req, res) {
    ParkingLot.find({}, function(err, result){
        console.log(result)
        console.log(err)
        res.send(result)
    })
})
};// exports end

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}