const express = require("express");
const router = express.Router();
const Note = require("../../models/Note");

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Lấy tất cả ghi chú
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().populate("reportId");
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
