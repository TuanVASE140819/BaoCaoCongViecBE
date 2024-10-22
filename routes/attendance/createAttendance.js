const express = require("express");
const router = express.Router();
const Attendance = require("../../models/Attendance");

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Tạo chấm công mới
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ngayChamCong:
 *                 type: string
 *                 format: date
 *                 description: Ngày chấm công
 *               IDnhanVien:
 *                 type: string
 *                 description: ID nhân viên
 *               trangThai:
 *                 type: string
 *                 description: Trạng thái chấm công
 *     responses:
 *       201:
 *         description: Chấm công được tạo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Lỗi khi tạo chấm công
 */
router.post("/", async (req, res) => {
  const { ngayChamCong, IDnhanVien, trangThai } = req.body;

  const attendance = new Attendance({
    ngayChamCong,
    IDnhanVien,
    trangThai,
  });

  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
