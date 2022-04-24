const asyncHandler = require("express-async-handler");

// @desc    Login
// @route   GET /auth/
const getLogin = asyncHandler(async (req, res) => {
  res.render("login");
});

// @desc    Login
// @route   POST /auth/login
const login = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log(name);
  if (name !== "pepe") {
    return res.send("login failed");
  }
  req.session.user = name;
  req.session.admin = true;
  res.redirect("/");
});

// @desc    Logout
// @route   GET /auth/logout
const logout = asyncHandler(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.redirect("/");
  });
});

module.exports = {
  getLogin,
  login,
  logout,
};
