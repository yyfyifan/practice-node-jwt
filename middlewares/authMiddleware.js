const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = (req, res, next) => {
    const token = req.cookies['jwt-cookie'];
    if (!token) {
        // redirect to login
        res.redirect('/login');
        return;
    }

    jwt.verify(token, /* the secrete we use */ 'very secret', (err, decodedToken) => {
        if (err) {
            // means jwt is not verified
            res.redirect('/login');
            return;
        }

        // correct jwt -- keep going on
        console.log(decodedToken);
        next();
    })
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies['jwt-cookie'];
    if (token) {
        jwt.verify(token, /* the secrete we use */ 'very secret', async (err, decodedToken) => {
            if (err) {
                // means jwt is not verified
                console.log(err);
                res.locals.user = null;

                next();
            }
            // correct jwt -- keep going on
            const user = await User.findById(decodedToken.id);
            // attach the current user on locals
            res.locals.user = user;
            next();
        })
    } else {
        res.locals.user = null;
        next();
    }
}


exports.requireAuth = requireAuth;
exports.checkUser = checkUser;