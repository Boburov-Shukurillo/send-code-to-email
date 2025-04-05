const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    uniquie: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: { type: Boolean, default: false }, // email tasdiqlanganmi?
  verificationCode: { type: String },
});

const UserModel = mongoose.model("UerModel", UserSchema);

module.exports = UserModel;
