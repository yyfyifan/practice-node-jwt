const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// handle errors - return a object that contains error message for each field
// the unique constraint can only be detected by the existence of `error.code`
const handleErrors = (error) => {
    console.log(error)
    const errorMessage = {}
    if (error.code === 11000) {
        errorMessage.email = 'The email is already registered';
        return errorMessage;
    }

    Object.keys(error.errors).forEach(field => {
        errorMessage[field] = error.errors[field].properties.message;
    })

    // check unique constraint
    
    return errorMessage;
}

// Create a JWT that only contains the ID of the new user
const createToken = (id) => {
    // return a JWT with signature
    return jwt.sign({id}, 'very secret', {
        expiresIn: 3 * 24 * 60 * 60// userd by the verification at the server, not the time of client
    })
};


module.exports.signupGet = (req, res) => {
    res.render('signup');
};

module.exports.signupPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const document = await userModel.create({
            email,
            password
        });
        // return a JWT of the new user
        const token = createToken(document._id);
        // save the cookie. the name of cookie is irrelevant
        res.cookie('jwt-cookie', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3  // duration of this cookie
        })
        res.status(201).json({user: document._id});
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
}

module.exports.loginGet = (req, res) => {
    res.render('login');
}

module.exports.loginPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const document = await User.login(email, password);
        const token = createToken(document._id);
        // save the cookie. the name of cookie is irrelevant
        res.cookie('jwt-cookie', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3  // duration of this cookie
        })
        res.status(200).json({user: document._id});
    } catch(err) {
        console.log(err)
        res.status(400).json(err);
    }
};

module.exports.logoutGet = (req, res) => {
    res.cookie('jwt-cookie', '', {maxAge: 1});
    res.redirect('/');
};