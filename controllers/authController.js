const userModel = require('../models/userModel');


// handle errors - return a object that contains error message for each field
// the unique constraint can only be detected by the existence of `error.code`
const handleErrors = (error) => {
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


module.exports.signupGet = (req, res) => {
    res.render('signup');
}

module.exports.signupPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const document = await userModel.create({
            email,
            password
        });
        res.status(201).json(document);
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
}

module.exports.loginGet = (req, res) => {
    res.render('login');
}

module.exports.loginPost = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.json(req.body);
}