const mongoose = require("mongoose");
const DonHang = require("../model/don-hang");

exports.donHang_post = (req, res, next) => {
  const donHang = new DonHang({
    _id: mongoose.Types.ObjectId(),
    hoTen: req.body.hoTen,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    diaChi: req.body.diaChi,
    product: req.body.product,
    total: req.body.total,
    discountCode: req.body.discountCode,
    trangThai: req.body.trangThai,
    liDo: req.body.liDo,
    date: req.body.date,
    userId: req.body.userId,
  });
  donHang
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Don Hang Stared",
        createdDonHang: {
          _id: mongoose.Types.ObjectId(),
          hoTen: result.hoTen,
          email: result.email,
          phoneNumber: result.phoneNumber,
          diaChi: result.diaChi,
          product: result.product,
          total: result.total,
          discountCode: result.discountCode,
          trangThai: result.trangThai,
          liDo: result.liDo,
          date: result.date,
          userId: result.userId,
        },
        request: {
          type: "GET",
          url: "http://localhost:5000/don-hang/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.donHang_get_all = (req, res, next) => {
  DonHang.find()
    .then((result) => {
      res.status(200).json({
        count: result.length,
        donHang: result.map((item) => {
          return {
            _id: item._id,
            hoTen: item.hoTen,
          email: item.email,
          phoneNumber: item.phoneNumber,
          diaChi: item.diaChi,
          product: item.product,
          total: item.total,
          discountCode: item.discountCode,
          trangThai: item.trangThai,
          liDo: item.liDo,
          date: item.date,
          userId: item.userId,
            request: {
              type: "GET",
              url: "http://localhost:5000/don-hang/" + item._id,
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

exports.donHang_delete = (req, res, next) => {
  const id = req.params.donHangId;
  DonHang.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Don Hang Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.donHang_get_one = (req, res, next) => {
  DonHang.findById(req.params.donHangId)
    .then((item) => {
      if (item) {
        res.status(200).json({
          _id: item._id,
          hoTen: item.hoTen,
          email: item.email,
          phoneNumber: item.phoneNumber,
          diaChi: item.diaChi,
          product: item.product,
          total: item.total,
          discountCode: item.discountCode,
          trangThai: item.trangThai,
          liDo: item.liDo,
          date: item.date,
          userId: item.userId,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for don hang ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.donHang_put = (req, res, next) => {
  const id = req.params.donHangId;
  DonHang.findByIdAndUpdate({ _id: id }, req.body)
    .exec()
    .then(() => {
      DonHang.findOne({ _id: id }).then((result) => {
        res.status(200).json({
          donHang: result,
          message: "DonHang Updated",
          request: {
            type: "GET",
            url: "http://localhost:5000/don-hang/" + result._id,
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
