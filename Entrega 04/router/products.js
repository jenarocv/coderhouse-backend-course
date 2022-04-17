const { Router } = require("express");
const Container = require("../Container");

const productsRouter = Router();

const products = new Container("products.txt");

productsRouter.get("/", async (req, res) => {
    console.log(products);
    res.json(await products.getAll());
});

productsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await products.getById(id));
});

productsRouter.post("/", async (req, res) => {
    console.log(req.body);
    res.json(await products.save(req.body));
});

productsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await products.update(id, req.body));
});

productsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await products.deleteById(id));
});

exports.productsRouter = productsRouter;
