const {Schema, model, default: mongoose} = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema( {
    username: {
        unique: true,
        type: String,
        required: true,
    }
});

userSchema.plugin(passportLocalMongoose);

const User = model('User', userSchema);

module.exports = User