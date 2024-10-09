const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");

/**
 * @swagger
 * /api/reports/{id}:
 *   delete:
 *     summary: Xóa báo cáo
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của báo cáo
 *     responses:
 *       200:
 *         description: Báo cáo đã được xóa
 *       404:
 *         description: Không tìm thấy báo cáo
 */
router.delete("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report)
      return res.status(404).json({ message: "Không tìm thấy báo cáo" });

    await report.remove();
    res.json({ message: "Báo cáo đã được xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
