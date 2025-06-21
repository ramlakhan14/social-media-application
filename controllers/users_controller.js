const User = require('../models/user');

// render profile page
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    });
}

// render the sign up page
module.exports.signUp = function(req, res){
if(req.isAuthenticated()){
    return res.redirect('/users/profile');
}


    return res.render('user_sign_up', {
        title: "Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: " Sign In"
    });
}

// get the sign up data
module.exports.create = async function(req, res){
    if (req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error during user sign-up:', err);
        return res.redirect('back');
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}


module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.log('Error during logout:', err);
            return next(err); // Pass to Express error handler
        }

        return res.redirect('/');
    });
};
