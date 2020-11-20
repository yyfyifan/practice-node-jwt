# README

This is a practice project for nodejs + express + authentication using JWT.

The new packages that I've learned through this project are:
* validator: functions for various validator rules
* mongoose hook: hook functions that will be called at some specific life cycle point
* bcrypt: encryption library.
  * When a new user sign up, we create a random "salt" and hash the combined (password, salt) string to a random string, in case of reverse engineering
  * When a user try to log in, we take the password and attach the same salt, using the hash algorithm to calculate the random message, and check its the same as the saved one.