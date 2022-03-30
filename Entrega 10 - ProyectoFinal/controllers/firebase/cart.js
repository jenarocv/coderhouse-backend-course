const asyncHandler = require("express-async-handler");
const admin = require("firebase-admin");
const firebase = admin.firestore();
const productsCollection = firebase.collection("products");
const cartsCollection = firebase.collection("carts");

// @desc    Get carts
// @route   GET /api/carts
const getCarts = asyncHandler(async (req, res) => {
  const snapshot = await cartsCollection.get();
  const docs = snapshot.docs;

  const carts = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.status(200).json(carts);
});

// @desc    Set cart
// @route   POST /api/carts
const setCart = asyncHandler(async (req, res) => {
  const carts = await cartsCollection.add({
    products: [],
  });

  res.status(200).json(carts);
});

// @desc    Delete cart
// @route   DELETE /api/carts/:id
const deleteCart = asyncHandler(async (req, res) => {
  const doc = cartsCollection.doc(req.params.id);

  const item = await doc.delete();

  res.status(200).json(item);
});

// @desc    Get products on a cart
// @route   GET /:id/products
const getProducts = asyncHandler(async (req, res) => {
  const doc = cartsCollection.doc(req.params.id);
  const item = await doc.get();
  const cart = item.data();

  res.status(200).json(cart.products);
});

// @desc    Set product on a cart
// @route   POST /:cartId/products/:productId
const setProduct = asyncHandler(async (req, res) => {
  const cartDoc = cartsCollection.doc(req.params.cartId);
  const cartItem = await cartDoc.get();
  const cart = cartItem.data();

  const productDoc = productsCollection.doc(req.params.productId);
  const productItem = await productDoc.get();
  const product = productItem.data();

  const cartWithNewProduct = [...cart.products, product.id];

  await cartDoc.update({ products: cartWithNewProduct });

  res.status(200).json(cart.products);
});

// @desc    Delete product from a cart
// @route   POST /:cartId/products/:productId
const deleteProduct = asyncHandler(async (req, res) => {
  const cartDoc = cartsCollection.doc(req.params.cartId);
  const cartItem = await cartDoc.get();
  const cart = cartItem.data();

  const productDoc = productsCollection.doc(req.params.productId);
  const productItem = await productDoc.get();
  const product = productItem.data();

  const cartWithDeletedProduct = cart.products.filter((p) => p !== product.id);

  await cartDoc.update({ products: cartWithDeletedProduct });

  res.status(200).json(cart.products);
});

module.exports = {
  getCarts,
  setCart,
  deleteCart,
  getProducts,
  setProduct,
  deleteProduct,
};
