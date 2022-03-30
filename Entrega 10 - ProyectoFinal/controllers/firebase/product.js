const asyncHandler = require("express-async-handler");
const admin = require("firebase-admin");
const firebase = admin.firestore();
const productsCollection = firebase.collection("products");

// @desc    Get products
// @route   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const snapshot = await productsCollection.get();
  const docs = snapshot.docs;

  const products = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.status(200).json(products);
});

// @desc    Get single product
// @route   GET /api/products/:id
const getProduct = asyncHandler(async (req, res) => {
  const doc = productsCollection.doc(req.params.id);
  const item = await doc.get();
  const product = item.data();

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

  const product = await productsCollection
    .add({
      name: req.body.name,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      stock: req.body.stock,
    })
    .then((doc) => doc.id);

  res.status(200).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const doc = productsCollection.doc(req.params.id);

  const item = await doc.update({ id: req.params.id, ...req.body });

  res.status(200).json(item);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const doc = productsCollection.doc(req.params.id);

  const item = await doc.delete();

  res.status(200).json(item);
});

module.exports = {
  getProducts,
  getProduct,
  setProduct,
  updateProduct,
  deleteProduct,
};
