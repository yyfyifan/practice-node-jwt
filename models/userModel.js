const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [(value) => { return isEmail(value); }, 'Please enter an valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

// mongoose hook. let the callback function to be called before a new user is saved -- to hash the pwd
// `next` is like the same function in express middleware
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
})

userSchema.post('save', (doc, next) => {
    console.log("new user was created", doc);
    // call `next` to move on
    next();
})

// static method to login a user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email, email});
    if (user) {
        // bcrypt can compare plaintext with hashed text for us
        if(await bcrypt.compare(password, user.password)) {
            return user;
        }
        throw Error('incorrect password');
    }
    // means reject this promise in an async method
    throw Error('incorrect email');
}

const User = mongoose.model('User', userSchema);

module.exports = User;