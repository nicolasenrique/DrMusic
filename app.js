const createError = require('http-errors');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');

const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.resolve(__dirname, "./public");

const mainRouter = require("./routes/main");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const carritoRouter = require("./routes/carrito");

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/carrito", carritoRouter);



app.listen(process.env.PORT || 3000, function () {
  console.log("Server 3000 running");
});

app.use(express.static(publicPath));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
