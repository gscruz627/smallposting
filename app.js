// Express and Mongo
const express = require("express");
const mongoose = require("mongoose");
require("./config/db.js")

// Authentication with Passport JS
const passport = require("passport");
const session = require('express-session');
const LocalStrategy = require("passport-local");
const User = require("./models/User")
const cors = require("cors");
const flash = require("connect-flash");

// Templating and Parsing
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");

//routing
const posts = require('./routes/posts');
const users = require("./routes/users");

//Initialize and configure App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Passport use session and configure Serialization
app.use(session({
    name: 'session-id',
    secret: '123-456-789',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
passport.use(User.createStrategy());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

// Set static and Templating paths
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'static')))

app.set("view engine", "html");
app.set("views", path.join(__dirname, 'views'));
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

//Routes
app.get("/", (req, res) => {
    res.render("index.html", {req: req});
})

app.use("/users/", users);
app.use("/posts/", posts);

//Error routes and handlers
app.use( (req, res, next) => {
    res.render("404.html");
  });
/*
app.use(function(err, req, res, next) {
   res.render("500.html");
});*/

app.listen(8000);