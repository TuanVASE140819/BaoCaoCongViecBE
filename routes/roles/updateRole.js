const express = require("express");
const router = express.Router();
const Role = require("../../models/Role");

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Cập nhật thông tin vai trò
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của vai trò
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Lỗi khi cập nhật vai trò
 *       404:
 *         description: Không tìm thấy vai trò
 */
router.put("/:id", async (req, res) => {
  const { tenVaiTro } = req.body;
  try {
    const role = await Role.findById(req.params.id);
    if (!role)
      return res.status(404).json({ message: "Không tìm thấy vai trò" });

    role.tenVaiTro = tenVaiTro;
    const updatedRole = await role.save();
    res.json(updatedRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
