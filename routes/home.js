const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");

router.get("/", (req, res) => {
    res.render("index.html", { layout: "layout.html"});
})

module.exports = router;