const express = require("express");
const router = express.Router();
const User = require("../../models/User");

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Lấy thông tin nhân viên theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của nhân viên
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Không tìm thấy nhân viên
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
