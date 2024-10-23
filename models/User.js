// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  tenNhanVien: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Đảm bảo email là duy nhất
  },
  password: {
    type: String,
    required: true,
  },
  IDRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  ngaySinh: {
    type: Date,
    required: false,
  },
  ngayTao: {
    type: Date,
    default: Date.now,
  },
  nguoiTao: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
