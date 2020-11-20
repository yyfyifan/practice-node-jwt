const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const morgan = require('morgan');

const app = express();

// middleware -- public folder
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

app.use(authRouter);

// view engine
app.set('view engine', 'ejs');

// database connection -- only start listening after the connection is established
const dbURI = `Using a real mongodb URI`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
  }))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));