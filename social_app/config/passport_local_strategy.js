const passport = require("passport");
const User = require("../models/user");

const LocalStrategy = require('passport-local').Strategy;



//Authentication
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email,password,done){
        //find a user & establish the identity
        User.findOne({email: email}, function(err,user){
            if(err){
                console.log('Error in fininf user ---> Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Username/Passowrd');
                return done(null, false);
            }

            return done(null, user);

        });
    }

));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null, user.id);
});




//deserializing the user fro the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in fininf user ---> Passport');
            return done(err);
        }

        return done(null, user);

    });
});


//Check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if user is signed in, then pass on the quest to next function which is controllers action
    if(req.isAuthenticated()){
        return next();
    }
    //if user not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated){
        //req.user contains the current signed in user from the session cookie and we are sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;