const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectMongo = require("./config/mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

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
app.use(cookieParser());

const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongoOptions: advanceOptions,
    }),
    secret: "secret",
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: { maxAge: 600 * 1000 },
  })
);

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

/* ------------------------------------------------------ */
/* Routes */

app.use("/", require("./routes/messages"));
app.use("/products", require("./routes/products"));
app.use("/auth", require("./routes/auth"));

app.use(errorHandler);

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error on server ${error}`));
