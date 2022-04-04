const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const connectMongo = require("./config/mongo");

dotenv.config({ path: "./config/config.env" });

/* ------------------------------------------------------ */
/* Connect to database */
connectMongo();

const app = express();

/* ------------------------------------------------------ */
/* Template engine */
app.set("views", "public/views");
app.set("view engine", "ejs");

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

/* ------------------------------------------------------ */
/* Routes */

app.use("/products", require("./routes/products"));
app.use("/", require("./routes/messages"));

app.use(errorHandler);

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error on server ${error}`));
