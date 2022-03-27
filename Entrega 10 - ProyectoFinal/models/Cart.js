const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  products: [],
});
