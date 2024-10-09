const express = require("express");
const router = express.Router();
const User = require("../../models/User");

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xóa nhân viên
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
 *         description: Nhân viên đã được xóa
 *       404:
 *         description: Không tìm thấy nhân viên
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
