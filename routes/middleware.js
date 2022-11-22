require("dotenv").config();
const jwt = require("jsonwebtoken");

// Checking User logged in status
const isAuthenticated = async (req, res, next) => {
    try{
        // Check if auth header exists
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1]
            // here we divide the token (has 3 parts) and get the first one
            if(token){
                const payload = await jwt.verify(token, proces.env.JWT_SECRET_KEY);
                if(payload){
                    // store user data
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({error: "JWT Authentication Error"});
                }
            } else {
                res.status(400).json({error: "No token, or error forming a token"});
            }
        } else {
            res.status(400).json({error: "No Authorization header"})
        }
    } catch(err){
        res.status(400).json({message:err})
    }
}

module.exports = isAuthenticated;