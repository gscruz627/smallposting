const express = require("express");
const User = require("../models/User");
const passport = require("passport");
const router = express.Router();
const isloggedin = require("./local.js")

router.get("/register", (req, res) => {
    // The code doesn't work without these two lines
    let b;
    try{b = req.flash('error')[0];}catch(e){};
    if(b){
        res.render("register.html", { "error": b.message})
    } else {
        res.render("register.html")
    }
})

router.get("/login", (req, res) => {
    res.render("login.html");
})

router.post("/register", (req, res, next) => {
    try{
        User.register(new User({ username: req.body.username}),
        req.body.password, (err, currentUser) => {
            if(err){
                req.flash('error', err);
                res.redirect("/users/register")
            } else{
                passport.authenticate('local')(req, res, () => {
                    User.findOne({
                        username:req.body.username
                    }, (err, currentUser) => {
                        res.redirect('/')
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
            res.redirect("/")
        }
    })
});

router.post('/logout', isloggedin, (req, res, next) => {
    if(req.session){
        req.session.destroy((err) =>{
            if(err){
                console.log(err);
            } else {
                res.clearCookie('sesion-id');
                req.logout(() => {});
                res.redirect("/");
            }
        })
    } else {
        const err = new Error("You are not logged in");
        err.status(403);
        res.redirect("/");
    }
})
module.exports = router;