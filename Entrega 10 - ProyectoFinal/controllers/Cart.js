const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc    Get carts
// @route   GET /api/carts
// @access  Private
const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({});

  res.status(200).json(carts);
});

// @desc    Set cart
// @route   POST /api/carts
// @access  Private
const setCart = asyncHandler(async (req, res) => {
  const carts = await Cart.create({
    products: [],
  });

  res.status(200).json(carts);
});

// @desc    Delete cart
// @route   DELETE /api/carts/:id
// @access  Private
const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  if (!cart) {
    res.status(400);
    throw new Error("Cart not found");
  }

  await cart.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Get products on a cart
// @route   GET /:id/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  if (!cart) {
    res.status(400);
    throw new Error(`Cart not found with id of ${req.params.id}`);
  }

  res.status(200).json(cart.products);
});

// @desc    Set product on a cart
// @route   POST /:cartId/products/:productId
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.cartId);

  if (!cart) {
    res.status(400);
    throw new Error("Cart not found");
  }

  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const cartWithNewProduct = await Cart.updateOne(
    { _id: req.params.cartId },
    { $push: { products: req.params.productId } }
  );
  res.status(200).json(cartWithNewProduct);
});

// @desc    Set product on a cart
// @route   POST /:cartId/products/:productId
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.cartId);

  if (!cart) {
    res.status(400);
    throw new Error("Cart not found");
  }

  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const cartWithDeletedProduct = await Cart.updateOne(
    { _id: req.params.cartId },
    { $pull: { products: req.params.productId } }
  );
  res.status(200).json(cartWithDeletedProduct);
});

module.exports = {
  getCarts,
  setCart,
  deleteCart,
  getProducts,
  setProduct,
  deleteProduct,
};
