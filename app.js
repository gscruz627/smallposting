const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
const connection = require("./config/db");
const home = require('./routes/home');
const nunjucks = require("nunjucks");
const users = require("./routes/users");
const cors = require("cors");
require("./routes/local");
var session = require('express-session');


app.use(cors());
app.use(session({
    name: 'session-id',
    secret: '123-456-789',
    saveUninitialized: false,
    resave: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
mongoose.connection.once('open', () => {
    console.log("DB connected succesfully");
});

app.use(express.static('static'))
app.set("view engine", "html");
app.set("views", "./views");
nunjucks.configure('views',{
    autoescape:true,
    express:app
})

app.use('/', home);

app.use("/users/", users)

app.listen(8000);