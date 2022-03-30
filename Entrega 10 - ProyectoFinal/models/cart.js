const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
