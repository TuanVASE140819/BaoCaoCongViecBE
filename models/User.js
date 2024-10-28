const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  tenNhanVien: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
    required: true,
  },
  ngayTao: {
    type: Date,
    default: Date.now,
  },
  nguoiTao: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
