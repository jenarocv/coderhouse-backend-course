const express = require("express");
const router = express.Router();

const {
  getCarts,
  setCart,
  deleteCart,
  getProducts,
  setProduct,
  deleteProduct,
} = require("../../controllers/firebase/cart");

router.route("/").get(getCarts).post(setCart);

router.route("/:id").delete(deleteCart).get(getProducts);

router.route("/:id/products");

router
  .route("/:cartId/products/:productId")
  .post(setProduct)
  .delete(deleteProduct);

module.exports = router;
