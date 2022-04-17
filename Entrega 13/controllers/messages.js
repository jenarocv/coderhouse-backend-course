const asyncHandler = require("express-async-handler");
const Message = require("../models/messages");
const { normalizeMessages } = require("../utils/normalizr");

// @desc    Get messages
// @route   GET /api/messages
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({});
  //const normalized = normalizeMessages(messages);

  res.render("index", { chats: messages });
});

// @desc    Set product
// @route   POST /api/messages
const setMessage = asyncHandler(async (req, res) => {
  if (!req.body.author.email) {
    res.status(400);
    throw new Error("Please add a name");
  }

  const message = await Message.create({
    author: {
      email: req.body.author.email,
      name: req.body.author.name,
    },
    message: req.body.message,
  });
  const messages = await Message.find({});
  res.render("index", { chats: messages });
});

module.exports = {
  getMessages,
  setMessage,
};
