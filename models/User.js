const {Schema, model, default: mongoose} = require("mongoose");

const userSchema = new mongoose.Schema( {
    username: {
        unique: true,
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const User = model('User', userSchema);

module.exports = User