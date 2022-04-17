const express = require("express");
const app = express();
const port = 8080;
const Container = require("./Container.js");
const db = new Container("products.txt");

app.get("/productos", async (req, res) => {
    res.send(await db.getAll());
});

app.get("/randomProduct", async (req, res) => {
    res.send(await db.getRandom());
});

// No requerido en la consigna, lo hice para practicar
app.get("/producto/:id", async (req, res) => {
    res.send(await db.getById(req.params.id));
});

app.listen(port, (req, res) => {
    console.log(`App en el puerto ${port}`);
});
