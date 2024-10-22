const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  ngayChamCong: {
    type: Date,
    required: true,
  },
  IDnhanVien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trangThai: {
    type: String,
    enum: ["Đi làm", "Nghỉ phép", "Nghỉ không phép"],
    required: true,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
