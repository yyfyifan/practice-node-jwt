const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/authMiddleware');
const config = require('./config');

const app = express();

// middleware -- public folder
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(authRouter);
app.use(authMiddleware.requireAuth);
app.use(authMiddleware.checkUser);

// view engine
app.set('view engine', 'ejs');

// database connection -- only start listening after the connection is established
const dbURI = config.mongodbURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
  }))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home', req.user));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// cookies example
// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-Cookie', 'user=yifan');

//   // set cookies using cookie-parser
//   res.cookie('newUser', false);
//   res.cookie('newUser', false, { 
//     maxAge: 1000 * 60 * 60, 
//     secure: true,  // only set when it's https -- should be used in prod
//     httpOnly: true // does not support AJAX
//    });

//   res.send("hello world");
// })

// app.get('/get-cookies', (req, res) => {
 
//   // read cookies by cookie-parser - it's an object
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.send('get cookies');
// });