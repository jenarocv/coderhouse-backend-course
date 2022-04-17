const express = require("express");
const { productsRouter } = require("./router/products");
const handlebars = require("express-handlebars");

const app = express();

/* ------------------------------------------------------ */
/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ------------------------------------------------------ */
/* Handlebars */

const hbs = handlebars.create({
    defaultLayout: "index",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
});

hbs.handlebars.registerHelper("greaterThan", function (arg1, arg2, options) {
    if (arg1 > arg2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

/* ------------------------------------------------------ */
/* Routers */

app.use("/", productsRouter);

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8081;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error on server ${error}`));
