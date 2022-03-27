const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

/* ------------------------------------------------------ */
/* Connect to database */
connectDB();

const app = express();

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

/* ------------------------------------------------------ */
/* Routes */

app.use("/api/products", require("./routes/products"));
app.use("/api/carts", require("./routes/carts"));

app.use(function (req, res, next) {
  const error = {
    error: -2,
    description: `Method: ${req.method}, Route: ${req.originalUrl} not implemented.`,
  };
  res.json(error);
});

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error on server ${error}`));
