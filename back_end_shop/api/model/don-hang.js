const mongoose = require("mongoose");

const donHangSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hoTen: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  phoneNumber: { type: Number, required: true },
  diaChi: { type: String, required: true },
  product: { type: Array, required: true },
  total: { type: Number, required: true },
  discountCode: { type: String, default:0 },
  trangThai: { type: String, required: true },
  liDo: { type: String, default:"" },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: { type: String, default:0 }
});

module.exports = mongoose.model("DonHang", donHangSchema);
