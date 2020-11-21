const express = require('express');
const {signupGet, signupPost, loginGet, loginPost, logoutGet} = require('../controllers/authController');

const router = express.Router();

router.get('/login', loginGet);

router.post('/login', loginPost);


router.get('/signup', signupGet);


router.post('/signup', signupPost);

router.get('/logout', logoutGet);

module.exports = router;