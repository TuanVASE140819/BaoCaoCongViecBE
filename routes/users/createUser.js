const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { sendWelcomeEmail } = require("../../utils/sendEmail");

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Tạo nhân viên mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenNhanVien:
 *                 type: string
 *                 description: Tên nhân viên
 *               email:
 *                 type: string
 *                 description: Email của nhân viên
 *               password:
 *                 type: string
 *                 description: Mật khẩu của nhân viên
 *               IDRole:
 *                 type: string
 *                 description: ID của vai trò
 *               ngaySinh:
 *                 type: string
 *                 format: date
 *                 description: Ngày sinh của nhân viên
 *               nguoiTao:
 *                 type: string
 *                 description: Người tạo nhân viên
 *               isActive:
 *                 type: boolean
 *                 description: Trạng thái kích hoạt của nhân viên
 *     responses:
 *       201:
 *         description: Nhân viên được tạo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Lỗi khi tạo nhân viên
 */
router.post("/", async (req, res) => {
  const { tenNhanVien, email, password, IDRole, ngaySinh, nguoiTao, isActive } =
    req.body;

  try {
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      tenNhanVien,
      email,
      password: hashedPassword,
      IDRole,
      ngaySinh,
      nguoiTao,
      isActive,
    });

    const newUser = await user.save();

    // Gửi email chào mừng
    sendWelcomeEmail(email, tenNhanVien);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
