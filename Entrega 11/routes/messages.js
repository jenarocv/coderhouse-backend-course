const express = require("express");
const router = express.Router();
const { getMessages, setMessage } = require("../controllers/messages");

router.route("/").get(getMessages).post(setMessage);

module.exports = router;
