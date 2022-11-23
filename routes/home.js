const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");

router.get("/", (req, res) => {
    console.log(req.user + "HOME ---------------------------");
    res.render("index.html", { layout: "layout.html", req: req});
})

module.exports = router;