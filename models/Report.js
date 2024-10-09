const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  ngayBaoCao: {
    type: Date,
    required: true,
  },
  noiDungHomNay: {
    type: String,
    required: true,
  },
  noiDungDuKienNgayMai: {
    type: String,
    required: true,
  },
  IDnhanVien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Report", reportSchema);
