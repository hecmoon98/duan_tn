const mongoose = require("mongoose");
const Product = require("../model/product");
const category = require("../model/category");

exports.product_post = (req, res, next) => {
  category
    .findById(req.body.categoryId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "CategoryId not found",
        });
      }
      const product = new Product({
        _id: mongoose.Types.ObjectId(),
        images: req.files["images"],
        name: req.body.name,
        price: req.body.price,
        moTa: req.body.moTa,
        chatLieu: req.body.chatLieu,
        huongDanSD: req.body.huongDanSD,
        suKien: req.body.suKien,
        date: req.body.date,
        categoryId: req.body.categoryId,
      });
      return product.save();
    })
    .then((result) => {
      //   console.log(result);
      res.status(201).json({
        message: "News Stared",
        createdProduct: {
          _id: mongoose.Types.ObjectId(),
          images: result.images,
          name: result.name,
          price: result.price,
          moTa: result.moTa,
          chatLieu: result.chatLieu,
          huongDanSD: result.huongDanSD,
          suKien: result.suKien,
          date: result.date,
          categoryId: result.categoryId,
        },
        request: {
          type: "GET",
          url: "http://localhost:5000/product/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "CategoryId not found 404",
      });
    });
};

exports.product_get_all = (req, res, next) => {
  Product.find()
    .populate("categoryId", "name")
    .then((result) => {
      res.status(200).json({
        count: result.length,
        news: result.map((item) => {
          return {
            _id: item._id,
            images: item.images,
            name: item.name,
            price: item.price,
            moTa: item.moTa,
            chatLieu: item.chatLieu,
            huongDanSD: item.huongDanSD,
            suKien: item.suKien,
            date: item.date,
            categoryId: item.categoryId,
            request: {
              type: "GET",
              url: "http://localhost:5000/product/" + item._id,
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

exports.product_delete = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.product_get_one = (req, res, next) => {
  Product.findById(req.params.productId)
    .populate("categoryId", "name")
    .then((item) => {
      if (item) {
        res.status(200).json({
          _id: item._id,
          images: item.images,
          name: item.name,
          price: item.price,
          moTa: item.moTa,
          chatLieu: item.chatLieu,
          huongDanSD: item.huongDanSD,
          suKien: item.suKien,
          date: item.date,
          categoryId: item.categoryId,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for product ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.product_put = (req, res, next)=>{
  const id = req.params.productId;
  Product.findByIdAndUpdate({ _id: id},req.body)
    .exec()
    .then(() => {
      Product.findOne({ _id: id})
      .then(result=>{
        res.status(200).json({
          product:result,
          message: "Product Updated",
          request: {
            type: "GET",
            url: "http://localhost:5000/product/" + result._id
          }
        });
      })

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
