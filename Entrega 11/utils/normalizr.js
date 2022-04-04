const { normalize, schema } = require("normalizr");

// no entendi como hacer la normalizacion
const authorSchema = new schema.Entity("author");

const messageSchema = new schema.Entity("message");

const messageListSchema = new schema.Entity("messageList", {
  author: authorSchema,
  messages: [messageSchema],
});

const normalizeMessages = (messages) => normalize(messages, messageListSchema);

module.exports = { normalizeMessages };
