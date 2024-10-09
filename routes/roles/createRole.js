const express = require("express");
const router = express.Router();
const Role = require("../../models/Role");

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Tạo vai trò mới
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Vai trò được tạo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Lỗi khi tạo vai trò
 */
router.post("/", async (req, res) => {
  const { tenVaiTro } = req.body;
  const role = new Role({
    tenVaiTro,
  });
  try {
    const newRole = await role.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
