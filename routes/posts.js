const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const Post = require("../models/Post")

//TODO to move this function to an external file
const isloggedin = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        return res.redirect("/users/login");
    }
}

router.get('/all', async (req, res) => {
    const posts = await Post.find();
    console.log(req.user)
    res.render("all_posts.html", { posts: posts, req:req})
})

router.get('/new', isloggedin, (req, res) => {
    res.render("new_post.html", {req: req});
})
router.post('/new', isloggedin, async (req, res) => {
    try{
        const post = await Post.create({
            username: req.user.username,
            text: req.body.text,
        });
        console.log(post);
        post.save();
        res.redirect('/posts/all');
    }catch(err) {
        console.log(err);
    }
})
module.exports = router;