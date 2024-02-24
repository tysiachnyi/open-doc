const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  mode: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("UserSchema", UserSchema);
