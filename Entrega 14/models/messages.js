const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
  {
    author: {
      email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100,
      },
      name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100,
      },
    },
    message: {
      type: String,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", MessagesSchema);
