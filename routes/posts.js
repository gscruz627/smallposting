const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const Post = require("../models/Post");
const isloggedin = require("./local.js");

router.get('/all', async (req, res) => {
    const posts = await Post.find();
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
        post.save();
        res.redirect('/posts/all');
    }catch(err) {
        console.log(err);
    }
})
module.exports = router;