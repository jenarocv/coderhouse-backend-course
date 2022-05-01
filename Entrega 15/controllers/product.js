const asyncHandler = require("express-async-handler");
const { generateProduct } = require("../utils/faker");

// @desc    Get products
// @route   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = [];
  for (let i = 1; i <= 5; i++) {
    const newProduct = generateProduct();
    products.push(newProduct);
  }

  res.render("products", { products: products });
});

module.exports = {
  getProducts,
};
