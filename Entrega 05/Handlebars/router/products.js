const { Router } = require("express");
const Container = require("../Container");

const productsRouter = Router();

const products = new Container("products.txt");

productsRouter.get("/", async (req, res) => {
    res.render("main");
});

productsRouter.post("/", async (req, res) => {
    console.log(req.body);
    await products.save(req.body);
    res.render("main");
});

productsRouter.get("/products", async (req, res) => {
    res.render("products", { products: await products.getAll() });
});

exports.productsRouter = productsRouter;
