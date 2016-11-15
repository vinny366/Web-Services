// app/routes.js
var mongoose = require("mongoose");
var TimeSlot = require('./models/spot.js');
var ParkingLot = require('./models/parkings.js');
var db = mongoose.connection;
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        var newSpot = new TimeSlot({timeSlot: {from : Date('2013-12-31'), to: Date('2013-12-31')}, status: 'free'})
        newSpot.save(function(err){
            if (err)
                {
                    console.log(err);
                    throw err;
                }
        })
        var newParkingLot = new ParkingLot({
            Name : 'Tempe Transit Centre',
            GeoX         : 'String',
            GeoY         : 'String',
            capacity     : 5,
            spots        : {
                "Spot1"      : [newSpot, newSpot],
                "Spot2"      : [newSpot, newSpot],
                "Spot3"      : [newSpot, newSpot],
                "Spot4"      : [newSpot, newSpot],
                "Spot5"      : [newSpot, newSpot]
            }
        });
        newParkingLot.save(function(err){
            if (err) {
                console.log(err);
            }
            else{
                console.log('Saved the Parking lot');
            }
        })
        res.render('index.ejs'); // load the index.ejs file

    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    // ===================================================
    // ==============SIGNUP ==============================
    // ===================================================

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

    // app.post('/signup',function(req,res){
    //     var email = req.body.email;
    //     var password = req.body.password;
    //     var phone = req.body.phone;
    //     // console.log(email + "---" + password + "---" + phone)


    // })

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
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

};// exports end

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}