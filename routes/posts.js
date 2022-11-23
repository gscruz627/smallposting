const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

//TODO to move this function to an external file
const isloggedin = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        return res.redirect("/users/login");
    }
}

router.get("/secret", isloggedin, (req, res) => {
    res.render("../views/secret.html");
    console.log(req.user + " POSTS ------------------------")
})

module.exports = router;