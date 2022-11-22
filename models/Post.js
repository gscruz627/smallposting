const {Schema, model, default: mongoose} = require("mongoose");

const PostSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Post = model('Post', PostSchema);

module.exports = "Post";