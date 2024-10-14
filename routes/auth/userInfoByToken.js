const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Middleware để xác thực token
const authenticateToken = (req, res, next) => {
  const token = req.query.token;

  if (!token) return res.status(401).json({ message: "Token không tồn tại" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ" });
    req.user = user;
    next();
  });
};

/**
 * @swagger
 * /api/auth/userInfoByToken:
 *   get:
 *     summary: Lấy thông tin người dùng từ token
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token không tồn tại
 *       403:
 *         description: Token không hợp lệ
 */
router.get("/userInfoByToken", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("IDRole");
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
