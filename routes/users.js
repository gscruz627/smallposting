const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { json } = require("express/lib/response");

router.get("/register/", (req, res) => { res.send("wooking")})
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

router.post("/login", async (req, res) => {
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
})
module.exports = router;