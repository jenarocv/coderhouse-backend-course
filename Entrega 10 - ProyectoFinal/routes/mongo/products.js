const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/authMiddleware");
const {
  getProducts,
  getProduct,
  setProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/mongo/product");

router.route("/").get(getProducts).post(protect, setProduct);
router
  .route("/:id")
  .get(getProduct)
  .delete(protect, deleteProduct)
  .put(protect, updateProduct);

module.exports = router;
