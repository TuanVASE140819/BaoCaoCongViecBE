const express = require("express");
const router = express.Router();
const User = require("../../models/User");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy tất cả nhân viên
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
