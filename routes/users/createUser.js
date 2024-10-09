const express = require("express");
const router = express.Router();
const User = require("../../models/User");

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
 *             $ref: '#/components/schemas/User'
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
  const { tenNhanVien, email, IDRole } = req.body;

  // Kiểm tra nếu IDRole không được cung cấp
  if (!IDRole) {
    return res.status(400).json({ message: "Role ID là bắt buộc" });
  }

  const user = new User({
    tenNhanVien,
    email,
    IDRole,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
