const express = require("express");
const { productsRouter } = require("./routes/products");
const { cartsRouter } = require("./routes/carts");
const app = express();

/* ------------------------------------------------------ */
/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ------------------------------------------------------ */
/* Template engine */
// app.set("views", "public/views");
// app.set("view engine", "ejs");

/* ------------------------------------------------------ */
/* Routes */

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use(function (req, res, next) {
    const error = {
        error: -2,
        description: `Method: ${req.method}, Route: ${req.originalUrl} not implemented.`,
    };
    res.json(error);
});

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error on server ${error}`));
