const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
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
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
});
