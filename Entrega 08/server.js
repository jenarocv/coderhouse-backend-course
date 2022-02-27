const express = require("express");
const { config } = require("./config");

const { productsRouter } = require("./router/products");
const { chatsRouter } = require("./router/chats");

const app = express();

/* ------------------------------------------------------ */
/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ------------------------------------------------------ */
/* Template engine */
app.set("views", "public/views");
app.set("view engine", "ejs");

/* ------------------------------------------------------ */
/* Routers */
app.use("/", chatsRouter);
app.use("/products", productsRouter);

/* ------------------------------------------------------ */
/* Database setup script */
const { script } = require("./config/script");
script();

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = config.port;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error on server ${error}`));
