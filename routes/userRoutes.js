const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy tất cả nhân viên
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Tạo nhân viên mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenNhanVien:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nhân viên được tạo
 */
router.post("/", async (req, res) => {
  const user = new User({
    tenNhanVien: req.body.tenNhanVien,
    email: req.body.email,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Lấy thông tin nhân viên theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Cập nhật thông tin nhân viên
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenNhanVien:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });

    user.tenNhanVien = req.body.tenNhanVien;
    user.email = req.body.email;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xóa nhân viên
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });

    await user.remove();
    res.json({ message: "Nhân viên đã được xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
