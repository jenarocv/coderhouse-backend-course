const express = require("express");
const router = express.Router();
const { getMessages, setMessage } = require("../controllers/messages");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getMessages).post(protect, setMessage);

module.exports = router;
