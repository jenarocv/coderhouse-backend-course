const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { productsRouter } = require("./router/products");
const { getMessages, saveMessage } = require("./models/messages");
const { getProducts, saveProduct } = require("./models/products");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* ------------------------------------------------------ */
/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ------------------------------------------------------ */
/* Template engine */
app.set("views", "public/views");
app.set("view engine", "ejs");

/* ------------------------------------------------------ */
/* Routers */
app.use("/", productsRouter);

/* ------------------------------------------------------ */
/* Socket config */

io.on("connection", (socket) => {
    console.log("New client connected!");

    const messages = getMessages();
    socket.emit("messages", messages);

    socket.on("new-message", (message) => {
        saveMessage(message);
        const allMessages = getMessages();
        io.sockets.emit("messages", allMessages);
    });

    const products = getProducts();
    socket.emit("products", products);

    socket.on("new-product", (product) => {
        saveProduct(product);
        const allProducts = getProducts();
        io.sockets.emit("products", allProducts);
    });
});

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${connectedServer.address().port}`);
});
connectedServer.on("error", (error) =>
    console.log(`Error on servidor ${error}`)
);
