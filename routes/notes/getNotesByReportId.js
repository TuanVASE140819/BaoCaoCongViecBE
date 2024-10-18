const express = require("express");
const router = express.Router();
const Note = require("../../models/Note");

/**
 * @swagger
 * /api/notes/report/{reportId}:
 *   get:
 *     summary: Lấy ghi chú theo reportId
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của báo cáo
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       404:
 *         description: Không tìm thấy ghi chú
 */
router.get("/report/:reportId", async (req, res) => {
  const { reportId } = req.params;

  try {
    const notes = await Note.find({ reportId }).populate("reportId");
    if (notes.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy ghi chú" });
    }

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
