const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/authMiddleware");
const {
  getProducts,
  getProduct,
  setProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/firebase/product");

router.route("/").get(getProducts).post(protect, setProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
