const User = require("../models/User");
const passport = require("passport");
const router = require("./home");

router.post("/register", (req, res, next) => {
    try{
        User.register(new User({
            username: req.body.username
        }),
        req.body.password, (err, currentUser) => {
            if(err){
                res.status(400);
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    err:err
                });
            } else{
                passport.authenticate('local')(req, res, () => {
                    User.findOne({
                        username:req.body.username
                    }, (err, currentUser) => {
                        res.status(200);
                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                            success:true,
                            status: "Registration Succesful",
                        });
                    });
                });
            }
        })
    } catch(err){
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.json({
            err:err,
            status:"Error from Initialization"
        })
    }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, currentUser) => {
        if(err){
            res.status(400);
            res.setHeader('Content-Type', 'application/json');
            res.json({
                err:err,
                status:"Invalid Error or Password"
            })
        } else {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json({
                success:true,
                status:"Succesfully logged in"
            })
        }
    })
});

router.post('/logout', (req, res, next) => {
    if(req.session){
        req.logout();
        req.session.destroy((err) =>{
            if(err){
                console.log(err);
            } else {
                res.clearCookie('sesion-id');
                res.json({
                    message: 'You are succesfully logged out'
                })
            }
        })
    } else {
        const err = new Error("You are not logged in");
        err.status(403);
        next(err);
    }
})

/*const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { json } = require("express/lib/response");
const passport = require("passport");
require("./local")
const LocalStrategy = require('passport-local').Strategy;

router.get("/register/", (req, res) => { res.send("working")})
router.post("/register/", async (req, res) => {
    User.
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

router.get("/login", (req, res, next) => {
    res.render("login.html", {layout:"layout.html"})
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/'
    
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