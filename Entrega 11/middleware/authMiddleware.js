const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
