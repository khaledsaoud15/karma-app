const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userModel);
