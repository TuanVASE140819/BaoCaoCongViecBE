const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");

/**
 * @swagger
 * /api/reports/employee/{employeeId}:
 *   get:
 *     summary: Lấy báo cáo theo ID nhân viên và ngày
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của nhân viên
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
 *       404:
 *         description: Không tìm thấy báo cáo
 */
router.get("/employee/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  const { date } = req.query;

  try {
    const query = { IDnhanVien: employeeId };
    if (date) {
      query.ngayBaoCao = date;
    }

    const reports = await Report.find(query).populate("IDnhanVien");
    if (reports.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy báo cáo" });
    }

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
