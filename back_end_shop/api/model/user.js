const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },

  hoTen: { type: String, required: true },
  gioiTinh: { type: String, required: true },
  ngaySinh: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  diaChi: { type: String, required: true },
  cmdd: { type: Number, default:0 },
  chucVu: { type: String, required: true },
  trangThai: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
