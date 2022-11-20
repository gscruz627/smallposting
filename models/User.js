const {Schema, model, default: mongoose} = require("mongoose");

const userSchema = new mongoose.Schema( {
    name: String,
    age: Number,
})

const User = model('User', userSchema);
module.exports = User