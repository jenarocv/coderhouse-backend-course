const { Router } = require("express");
const Container = require("../src/Container");

const productsRouter = Router();

const products = new Container("products.txt");

productsRouter.get("/", async (req, res) => {
    res.render("index");
});

productsRouter.get("/products", async (req, res) => {
    res.render("list", { products: await products.getAll() });
});

productsRouter.post("/", async (req, res) => {
    await products.save(req.body);
    res.render("index", { products: await products.getAll() });
});

exports.productsRouter = productsRouter;
