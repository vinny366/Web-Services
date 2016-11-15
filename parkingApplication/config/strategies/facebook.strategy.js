var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/usermodels');

module.exports = function(){
passport.use(new FacebookStrategy({
    clientID: '974189139393938',
    clientSecret: '016503f5fdfc0ff477c6da56c5b6836e',
    callbackURL: 'http://localhost:3000/auth/facebook/callback/',
    passReqToCallback:true
  },
  function(req,accessToken, refreshToken, profile, done) {
  	var user={};
  	var query = {
			'facebook.id' : profile.id
		};

	User.findOne(query,function(error,user){
		if(user){
				console.log("user found");
				done(null,user);
			}else{
				console.log("User Not Found");
				var user = new User;   // this is exported from usermodel.js
				 user.email = profile.emails[0].value;
			    user.displayName = profile.displayName;
			    user.facebook = {};
			    user.facebook.id = profile.id;
			    user.facebook.token = accessToken;
		 		user.save();
		 		done(null,user); // now routes have access
			}
	})
   
  }
));
};