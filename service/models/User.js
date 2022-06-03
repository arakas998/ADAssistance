const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScahema = new Schema ({
    ime: String,
    email: {
        unique: true,
        type: String
    },
    lozinka: String,
    rola: String
})

const User = mongoose.model("User", userScahema);

module.exports = User;