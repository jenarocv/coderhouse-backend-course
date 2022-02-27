const { Router } = require("express");
const sqlite = require("../config/sqlite-database");

const chatsRouter = Router();

chatsRouter.get("/", async (req, res) => {
  res.render("index", { chats: await sqlite("chats") });
});

chatsRouter.post("/", async (req, res) => {
  const chat = {
    ...req.body,
  };
  await sqlite("chats").insert({
    name: chat.name,
    message: chat.message,
    date: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
  });
  res.render("index", { chats: await sqlite.from("chats") });
});

exports.chatsRouter = chatsRouter;
