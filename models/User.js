const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        uniquie:true
    },
    email: {
        type: String,
        required: true,
        uniquie: true
    },
    password: {
        type: String,
        required: true
    },
    verify_code: {
        type: Number,
        minilength: 6,
        maxlength: 6,
        required: true
    },
})

const User = model("User", UserSchema)
module.exports = User