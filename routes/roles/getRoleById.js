const express = require("express");
const router = express.Router();
const Role = require("../../models/Role");

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Lấy thông tin vai trò theo ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của vai trò
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Không tìm thấy vai trò
 */
router.get("/:id", async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role)
      return res.status(404).json({ message: "Không tìm thấy vai trò" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
