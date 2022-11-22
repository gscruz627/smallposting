const mongoose = require("mongoose");
const express = require("express");
const app = express();
const connection = require("./config/db");
const home = require('./routes/home');
const nunjucks = require("nunjucks");
const users = require("./routes/users");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
require("./routes/local");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(cors());


mongoose.connection.once('open', () => {
    console.log("DB connected succesfully");
});


app.set("view engine", "html");
app.set("views", "./views");
nunjucks.configure('views',{
    autoescape:true,
    express:app
})

app.use('/', home);

app.use("/users/", users)

app.listen(8000);