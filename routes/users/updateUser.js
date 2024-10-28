const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Cập nhật thông tin nhân viên
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của nhân viên
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
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Lỗi khi cập nhật nhân viên
 *       404:
 *         description: Không tìm thấy nhân viên
 */
router.put("/:id", async (req, res) => {
  const { tenNhanVien, email, password, IDRole, ngaySinh, nguoiTao, isActive } =
    req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });

    user.tenNhanVien = tenNhanVien;
    user.email = email;
    user.IDRole = IDRole;
    user.ngaySinh = ngaySinh;
    user.nguoiTao = nguoiTao;
    user.isActive = isActive;

    // Kiểm tra và mã hóa lại mật khẩu nếu nó đã thay đổi
    if (password && password !== user.password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
