const express = require("express");
const router = express.Router();
const Note = require("../../models/Note");

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Tạo ghi chú mới
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nội dung của ghi chú
 *                 example: "Ghi chú mới"
 *               reportId:
 *                 type: string
 *                 description: ID của báo cáo liên quan
 *                 example: "60d5ec49f8d2b814c8a4d2b5"
 *     responses:
 *       201:
 *         description: Ghi chú được tạo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Lỗi khi tạo ghi chú
 */
router.post("/", async (req, res) => {
  const { content, reportId } = req.body;

  // Kiểm tra nếu các trường cần thiết không được cung cấp
  if (!content || !reportId) {
    return res.status(400).json({ message: "Content và reportId là bắt buộc" });
  }

  const note = new Note({
    content,
    reportId,
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
