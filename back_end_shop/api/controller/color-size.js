const mongoose = require("mongoose");
const ColorSize = require("../model/color-size");
const Product = require("../model/product");

exports.colorSize_post = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "ProductId not found",
        });
      }
      const colorSize = new ColorSize({
        _id: mongoose.Types.ObjectId(),
        color: req.body.color,
        size: req.body.size,
        soLuong: req.body.soLuong,
        date: req.body.date,
        productId: req.body.productId,
      });
      return colorSize.save();
    })
    .then((result) => {
      //   console.log(result);
      res.status(201).json({
        message: "Product Stared",
        createdColorSize: {
          _id: mongoose.Types.ObjectId(),
          color: result.color,
          size: result.size,
          soLuong: result.soLuong,
          date: result.date,
          productId: result.productId,
        },
        request: {
          type: "GET",
          url: "http://localhost:5000/color-size/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "ProductId not found 404",
      });
    });
};

exports.colorSize_get_all = (req, res, next) => {
  ColorSize.find()
    .populate("productId")
    .then((result) => {
      res.status(200).json({
        count: result.length,
        colorSize: result.map((item) => {
          return {
            _id: item._id,
            color: item.color,
            size: item.size,
            soLuong: item.soLuong,
            date: item.date,
            productId: item.productId,
            request: {
              type: "GET",
              url: "http://localhost:5000/color-size/" + item._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).status({
        error: err,
      });
    });
};

exports.colorSize_delete = (req, res, next) => {
  const id = req.params.colorSizeId;
  ColorSize.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "ColorSize Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.colorSize_get_one = (req, res, next) => {
  ColorSize.findById(req.params.colorSizeId)
    .populate("productId")
    .then((item) => {
      if (item) {
        res.status(200).json({
          _id: item._id,
          color: item.color,
          size: item.size,
          soLuong: item.soLuong,
          date: item.date,
          productId: item.productId,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for color and size ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.colorSize_put = (req, res, next) => {
  const id = req.params.colorSizeId;
  ColorSize.findByIdAndUpdate({ _id: id }, req.body)
    .exec()
    .then(() => {
      ColorSize.findOne({ _id: id }).then((result) => {
        res.status(200).json({
          colorSize: result,
          message: "ColorSize Updated",
          request: {
            type: "GET",
            url: "http://localhost:5000/color-size/" + result._id,
          },
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
