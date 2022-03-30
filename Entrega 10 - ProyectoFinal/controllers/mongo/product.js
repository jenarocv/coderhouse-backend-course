const asyncHandler = require("express-async-handler");
const Product = require("../../models/product");

// @desc    Get products
// @route   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.status(200).json(products);
});

// @desc    Get single product
// @route   GET /api/products/:id
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json(product);
});

// @desc    Set product
// @route   POST /api/products
const setProduct = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name to the product");
  }

  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    stock: req.body.stock,
  });

  res.status(200).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.updateOne(
    { _id: req.params.id },
    { product, ...req.body }
  );

  res.status(200).json(updatedProduct);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  await product.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProducts,
  getProduct,
  setProduct,
  updateProduct,
  deleteProduct,
};
