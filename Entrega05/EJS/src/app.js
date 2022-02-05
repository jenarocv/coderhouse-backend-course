const express = require("express");
const { productsRouter } = require("../router/products");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.set("views", "../views");
app.set("view engine", "ejs");

/* ------------------------------------------------------ */
/* Routers */

app.use("/", productsRouter);

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error on server ${error}`));
