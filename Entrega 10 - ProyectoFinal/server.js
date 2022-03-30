const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const connectMongo = require("./config/mongo");
const connectFirebase = require("./config/firebase");

dotenv.config({ path: "./config/config.env" });

/* ------------------------------------------------------ */
/* Connect to database */
connectMongo();
connectFirebase();

const app = express();

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

/* ------------------------------------------------------ */
/* Routes */

app.use("/api/mongo/products", require("./routes/mongo/products"));
app.use("/api/mongo/carts", require("./routes/mongo/carts"));

app.use("/api/firebase/products", require("./routes/firebase/products"));
app.use("/api/firebase/carts", require("./routes/firebase/carts"));

app.use(errorHandler);

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error on server ${error}`));
