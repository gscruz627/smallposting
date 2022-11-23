const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");


//TODO:  to move this function to an external file.
const isloggedin = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        return res.redirect("/users/login");
    }
}
module.exports = {isloggedin}