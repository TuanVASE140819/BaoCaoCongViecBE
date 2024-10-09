const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");

/**
 * @swagger
 * /api/reports/{id}:
 *   get:
 *     summary: Lấy báo cáo theo ID
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
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       404:
 *         description: Không tìm thấy báo cáo
 */
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate("IDnhanVien");
    if (!report)
      return res.status(404).json({ message: "Không tìm thấy báo cáo" });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
