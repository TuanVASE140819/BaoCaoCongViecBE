const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Lấy tất cả báo cáo
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 */
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().populate("nhanVien");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
