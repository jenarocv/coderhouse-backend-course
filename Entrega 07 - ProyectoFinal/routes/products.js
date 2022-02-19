const { Router } = require("express");
const Product = require("../controllers/Product");

const productsRouter = Router();

const products = new Product("products.txt");

const ADMIN = true;
// const ADMIN = false;

productsRouter.get("/", async (req, res) => {
    res.json(await products.getAll());
});

productsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await products.getById(id));
});

productsRouter.post("/", async (req, res) => {
    ADMIN
        ? res.json(await products.save(req.body))
        : res.json(
              (error = {
                  error: -1,
                  description: `Method: ${req.method}, Route: ${req.originalUrl} not authorized.`,
              })
          );
});

productsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    ADMIN
        ? res.json(await products.update(id, req.body))
        : res.json(
              (error = {
                  error: -1,
                  description: `Method: ${req.method}, Route: ${req.originalUrl} not authorized.`,
              })
          );
});

productsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    ADMIN
        ? res.json(await products.deleteById(id))
        : res.json(
              (error = {
                  error: -1,
                  description: `Method: ${req.method}, Route: ${req.originalUrl} not authorized.`,
              })
          );
});

exports.productsRouter = productsRouter;
