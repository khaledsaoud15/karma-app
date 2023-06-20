const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderModel = new Schema(
  {
    orderID: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    username: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", orderModel);
