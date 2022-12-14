require("dotenv-flow").config();
const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.once('open', () => {
    console.log("DB connected succesfully");
});
module.exports = connection;