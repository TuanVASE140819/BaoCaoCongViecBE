const express = require("express");
const router = express.Router();
const Note = require("../../models/Note");

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Xóa ghi chú
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của ghi chú
 *     responses:
 *       200:
 *         description: Ghi chú đã được xóa
 *       404:
 *         description: Không tìm thấy ghi chú
 */
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res.status(404).json({ message: "Không tìm thấy ghi chú" });

    await note.remove();
    res.json({ message: "Ghi chú đã được xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
