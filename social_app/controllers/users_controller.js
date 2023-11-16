
const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title: "User Profile"
    })
}

//Render Signup
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Social app | Sign Up"
    })
}


//Render sign In
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Social app | Sign In"
    })
}

//Get the signup data
module.exports.create = function(req,res){
    if(req.body.password!= req.body.confirm_password){
        return res.redirect('back');
    }

    /* User.findOne({email:req.body.email}, function(err, user){
        if(err){console.log('error sign up checking existing email'); return;}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in sign up 2nd loop'); return;}

                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('back');
        }

    }) */

    User.findOne({email:req.body.email}).then(function(err, user){
        if(err){console.log('error sign up checking existing email'); return;}

        if(!user){
            User.create(req.body).then(() => {            

                return res.redirect('/users/sign-in');
            })
            .catch((err)=>{
                console.log('error in sign up 2nd loop'); 
                return;
            });
        }else{
            return res.redirect('back');
        }
    });
}

//Sign in & create a session for the user
module.exports.createSession = function(req,res){
    //Todo later
}