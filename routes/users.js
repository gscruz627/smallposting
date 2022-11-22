const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { json } = require("express/lib/response");
const passport = require("passport");
require("./local")
const LocalStrategy = require('passport-local').Strategy;

router.get("/register/", (req, res) => { res.send("working")})
router.post("/register/", async (req, res) => {
    try{

        const encryptedPassword = await bcrypt.hash(req.body.password, 8);

        //where req.body params match user.
        const user = await User.create({
            username: req.body.username,
            password: encryptedPassword
        });
        user.save();
       res.json({message: "User succesfully created", username: user.username, password: user.password})
    } catch(err){
        res.status(400).json({error:err})
    }
})

router.get("/login", (req, res) => {
    res.render("login.html", {layout:"layout.html"})
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/'
    
}, (err, user, options) => {
    console.log(options) // options will be the complete object you pass in done()
}));

/*
router.post("/login", passport.authenticate('local', ) => {
    try{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/checkingfailure',
    })
} catch(err) { res.status(400); res.json({error:err})}
     if passport doesn't work
    try{
        const user = await User.findOne({username:req.body.username});
        if (user){
            const passwordResolution = await bcrypt.compare(req.body.password, user.password);
            if (passwordResolution){
                res.json({token})
            } else {
                res.status(400);
                res.json({message: "Passwords don't match"})
            }
        } else{
            res.status(400);
            res.json({message: "User does not exist"})
        }
    } catch(err){
        res.status(400);
        res.json({message: err})
    }
    
})*/
module.exports = router;