const { Router } = require("express");

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    res.render("index");
});

exports.productsRouter = productsRouter;
