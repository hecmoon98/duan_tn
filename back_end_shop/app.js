const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const categoryRoutes = require('./api/routes/category');
const productRoutes = require('./api/routes/product');
const colorSizeRoutes = require('./api/routes/color-size');
const userRoutes =require('./api/routes/user');
const donHangRoutes =require('./api/routes/don-hang');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://backend_shop:backend_shop@cluster0.yfu8l.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useMongoClient: true,
  }
);

app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// routes req

app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/color-size", colorSizeRoutes);
app.use("/user", userRoutes);
app.use("/don-hang", donHangRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Error");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
