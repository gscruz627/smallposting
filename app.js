const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/User");
const connection = require("./config/db");
const home = require('./routes/home');
const nunjucks = require("nunjucks");


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
app.listen(8000);