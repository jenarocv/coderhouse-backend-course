const { Router } = require("express");
const Cart = require("../controllers/Cart");

const cartsRouter = Router();

const carts = new Cart("carts.txt");

// Crea un carrito y devuelve su id
cartsRouter.post("/", async (req, res) => {
    res.json(await carts.save());
});

//Vacía un carrito y lo elimina.
cartsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await carts.deleteById(id));
});

// Listar todos los productos guardados en el carrito
cartsRouter.get("/:id/products", async (req, res) => {
    const { id } = req.params;
    res.json(await carts.getProductsById(id));
});

// Incorporar productos al carrito por su id de producto
cartsRouter.post("/:id/products", async (req, res) => {
    const { id } = req.params;
    res.json(await carts.saveProduct(id, req.body));
});

//Eliminar un producto del carrito por su id de carrito y de producto
cartsRouter.delete("/:cartId/products/:productId", async (req, res) => {
    const { cartId, productId } = req.params;
    res.json(await carts.deleteProductByIdFromCart(cartId, productId));
});

cartsRouter.get("/", async (req, res) => {
    console.log(carts);
    res.json(await carts.getAll());
});

cartsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await carts.update(id, req.body));
});

exports.cartsRouter = cartsRouter;
