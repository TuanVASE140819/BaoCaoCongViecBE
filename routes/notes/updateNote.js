const express = require("express");
const router = express.Router();
const Note = require("../../models/Note");

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Cập nhật ghi chú
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của ghi chú
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Lỗi khi cập nhật ghi chú
 *       404:
 *         description: Không tìm thấy ghi chú
 */
router.put("/:id", async (req, res) => {
  const { content, reportId } = req.body;
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res.status(404).json({ message: "Không tìm thấy ghi chú" });

    note.content = content;
    note.reportId = reportId;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
