const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

// @desc    Get products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.status(200).json(products);
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json(products);
});

// @desc    Set product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name to the product");
  }

  const product = await Product.create({
    name: req.body.text,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    stock: req.body.stock,
  });

  res.status(200).json(product);
});
module.exports = Product;
