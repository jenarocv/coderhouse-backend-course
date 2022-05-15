const express = require("express");
const router = express.Router();
const { getLogin, login, logout } = require("../controllers/auth");

router.route("/").get(getLogin);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
