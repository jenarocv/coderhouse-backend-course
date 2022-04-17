const { normalize, schema } = require("normalizr");

// no entendi como hacer la normalizacion
const authorSchema = new schema.Entity("author");

const messageSchema = new schema.Entity("message", {
  author: authorSchema,
});

const messageListSchema = new schema.Entity("messages", {
  messages: [messageSchema],
});

const normalizeMessages = (messages) =>
  normalize({ id: "messages", messages: messages }, messageListSchema);

module.exports = { normalizeMessages };
