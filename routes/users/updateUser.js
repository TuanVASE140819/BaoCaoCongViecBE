const express = require("express");
const router = express.Router();
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
 *             $ref: '#/components/schemas/User'
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
  const { tenNhanVien, email, password, IDRole, ngaySinh, nguoiTao } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });

    user.tenNhanVien = tenNhanVien;
    user.email = email;
    user.password = password;
    user.IDRole = IDRole;
    user.ngaySinh = ngaySinh;
    user.nguoiTao = nguoiTao;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
