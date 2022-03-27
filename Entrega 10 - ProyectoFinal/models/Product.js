const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 100,
    },
    code: {
      type: String,
      maxlength: 32,
    },
    thumbnail: {
      type: String,
    },
    price: {
      type: Number,
    },
    stock: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
