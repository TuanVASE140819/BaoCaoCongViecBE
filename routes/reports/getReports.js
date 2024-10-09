const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Lấy tất cả báo cáo hoặc lọc theo ngày
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Ngày báo cáo (YYYY-MM-DD)
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
  const { date } = req.query;
  const query = {};

  if (date) {
    query.ngayBaoCao = date;
  }

  try {
    const reports = await Report.find(query).populate("IDnhanVien");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
