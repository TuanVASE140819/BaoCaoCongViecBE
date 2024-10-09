const express = require("express");
const router = express.Router();
const Role = require("../../models/Role");

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Lấy tất cả vai trò
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
