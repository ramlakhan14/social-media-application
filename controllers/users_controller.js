const User = require('../models/user');

// Render user profile
module.exports.profile = function(req, res){
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if (user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                })
            }else{
                return res.redirect('/users/sign-in');

            }
        });
    }else{
        return res.redirect('/users/sign-in');

    }


    
}

// Render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// Render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// Get the sign up data
module.exports.create = async function(req, res){
    try {
        if (req.body.password !== req.body.confirm_password){
            return res.redirect('back');
        }

        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }

    } catch (err) {
        console.error('Error in user signup:', err);
        return res.status(500).send('Internal Server Error');
    }
}

// Sign in and create a session for the user
module.exports.createSession = async function(req, res){
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user || user.password !== req.body.password) {
            return res.redirect('back');
        }

        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');

    } catch (err) {
        console.error('Error in user sign-in:', err);
        return res.status(500).send('Internal Server Error');
    }
}
