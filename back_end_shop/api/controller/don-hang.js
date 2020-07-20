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

// exports.colorSize_get_all = (req, res, next) => {
//   ColorSize.find()
//     .populate("productId")
//     .then((result) => {
//       res.status(200).json({
//         count: result.length,
//         colorSize: result.map((item) => {
//           return {
//             _id: item._id,
//             color: item.color,
//             size: item.size,
//             soLuong: item.soLuong,
//             date: item.date,
//             productId: item.productId,
//             request: {
//               type: "GET",
//               url: "http://localhost:5000/don-hang/" + item._id,
//             },
//           };
//         }),
//       });
//     })
//     .catch((err) => {
//       res.status(500).status({
//         error: err,
//       });
//     });
// };

// exports.colorSize_delete = (req, res, next) => {
//   const id = req.params.colorSizeId;
//   ColorSize.remove({ _id: id })
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         message: "ColorSize Deleted",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };

// exports.colorSize_get_one = (req, res, next) => {
//   ColorSize.findById(req.params.colorSizeId)
//     .populate("productId")
//     .then((item) => {
//       if (item) {
//         res.status(200).json({
//           _id: item._id,
//           color: item.color,
//           size: item.size,
//           soLuong: item.soLuong,
//           date: item.date,
//           productId: item.productId,
//         });
//       } else {
//         res
//           .status(404)
//           .json({ message: "No valid entry found for color and size ID" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };

// exports.colorSize_put = (req, res, next) => {
//   const id = req.params.colorSizeId;
//   ColorSize.findByIdAndUpdate({ _id: id }, req.body)
//     .exec()
//     .then(() => {
//       ColorSize.findOne({ _id: id }).then((result) => {
//         res.status(200).json({
//           colorSize: result,
//           message: "ColorSize Updated",
//           request: {
//             type: "GET",
//             url: "http://localhost:5000/don-hang/" + result._id,
//           },
//         });
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };
