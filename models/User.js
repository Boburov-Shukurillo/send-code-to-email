const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verify_code: {
        type: Number,
        required: true
    }
})

module.exports = model("User", UserSchema)