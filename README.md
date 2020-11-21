# README

This is a practice project for nodejs + express + authentication using JWT.

* Signup process: 
  1. hash password(using pre-save hook) and save the new user into database
  2. create a JWT that contains the user's info and set cookie
  3. redirect
* Login process:
  1. check password and email
  2. create a JWT that contains the user's info and set cookie
  3. redirect
* Protecting routes
    1. for each request trying to access protected resources, check if the authentication JWT exists and verify it. If it fails, redirect to login/signup page
    2. query the database to get the user object, and attach it to `response.locals`
    3. when it passed, call `next`
* Signout
  1. front page send a GET request to backend page, it deletes the auth cookie
     1. we cannot delete cookie from the server, but can replace it with an empty string and set the maxAge to a minimum time
  2. redirect to login/home page


The new packages that I've learned through this project are:
* validator: functions for various validator rules
* mongoose hook: hook functions that will be called at some specific life cycle point
* bcrypt: encryption library.
  * When a new user sign up, we create a random "salt" and hash the combined (password, salt) string to a random string, in case of reverse engineering
  * When a user try to log in, we take the password and attach the same salt, using the hash algorithm to calculate the random message, and check its the same as the saved one.
* cookie-parser: process cookies
* jsonwebtoken: manipulating JWT



