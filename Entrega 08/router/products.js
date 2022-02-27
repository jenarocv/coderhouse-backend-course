const { Router } = require("express");
const mysql = require("../config/mysql-database");

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  res.render("products", { products: await mysql("products") });
});

productsRouter.post("/", async (req, res) => {
  const product = {
    ...req.body,
  };
  await mysql("products").insert({
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
  });
  res.render("products", { products: await mysql.from("products") });
});

exports.productsRouter = productsRouter;
