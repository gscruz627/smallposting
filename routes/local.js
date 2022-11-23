const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
/*
passport.use(new LocalStrategy(function verify(username, password, cb) {
    const currentUser = User.findOne( {"username":username});
    if(!currentUser){
        return cb(null, false, {message: "incorrect"})
    }
    try{
    if(!bcrypt.compareSync(password, currentUser.password)){
        return cb(null, false, {
            message: "Incorrect username of password"
        })
    } }catch(err){console.log(err)} //else{
        return cb(null, currentUser);
    //}
}));
/*
passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        const currentUser = User.findOne( {"username": username})

        if(!currentUser){
            return done(null, false, {
                message: "Incorrect username or password"
            })
        }
        if(!bcrypt.compareSync(password, currentUser.password)){
            return done(null, false, {
                message: "Incorrect username of password"
            })
        }
        return done(null, false, { message: "created?"})
    }
));

*/