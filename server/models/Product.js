const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    color: {
      type: Array,
    },
    size: {
      type: Array,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productModel);
