const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy(
    async (username, password) => {
        const currentUser = await User.findOne( {username: username})

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
