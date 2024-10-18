const express = require("express");
const router = express.Router();
const Note = require("../../models/Note");

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Lấy ghi chú theo ID
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
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Không tìm thấy ghi chú
 */
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate("reportId");
    if (!note)
      return res.status(404).json({ message: "Không tìm thấy ghi chú" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
