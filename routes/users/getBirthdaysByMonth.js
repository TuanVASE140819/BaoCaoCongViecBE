const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { io } = require("../../app"); // Import io từ app.js

/**
 * @swagger
 * /api/users/birthdays:
 *   get:
 *     summary: Lấy danh sách sinh nhật nhân viên theo tháng
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         required: true
 *         description: Tháng sinh nhật (1-12)
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   tenNhanVien:
 *                     type: string
 *                   email:
 *                     type: string
 *                   ngaySinh:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Lỗi khi lấy danh sách sinh nhật
 */
router.get("/", async (req, res) => {
  const { month } = req.query;

  if (!month || month < 1 || month > 12) {
    return res.status(400).json({ message: "Tháng không hợp lệ" });
  }

  try {
    const users = await User.find({
      ngaySinh: {
        $gte: new Date(new Date().getFullYear(), month - 1, 1),
        $lt: new Date(new Date().getFullYear(), month, 1),
      },
    }).select("_id tenNhanVien email ngaySinh");

    // Gửi thông báo qua Socket.IO
    io.emit("birthdayNotification", users);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
