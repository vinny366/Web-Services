// getting google Strategy
 var passport = require('passport');
 var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

 var User = require('../../models/usermodels');

 module.exports = function(){
 	 // identifying the app
 passport.use(new GoogleStrategy({
 	clientID : '942639518096-q8ub4t41l3vn5p1a7tebvd7ljq3soqru.apps.googleusercontent.com',
 	clientSecret: 'OvsNOtbdvdGmeBx65fkqIZNZ',
 	callbackURL:'http://localhost:3000/auth/google/callback/'
    },
 	function(req, accessToken, refreshToken, profile,done){

 		var user={};

		var query = {
			'google.id' : profile.id
		}; 

		User.findOne(query,function(error,user){
			if(user){
				console.log("user found");
				done(null,user);
			}else{
				console.log("User Not Found");
				var user = new User;   // this is exported from usermodel.js
				user.email = profile.emails[0];
		 		user.image = profile._json.image.url;
		 		user.displayName = profile.displayName;
		 		user.google={};
		 		user.google.id = profile.id;
		 		user.google.token = accessToken;
		 		user.save(function(err, thor) {
					  if (err) return console.error(err);
					  console.dir(thor);
					});
		 		done(null,user); // now routes have access
			}
		})
 		
 	}

 ));
};