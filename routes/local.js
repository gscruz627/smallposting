const isloggedin = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        return res.redirect("/users/login");
    }
}
module.exports = isloggedin;