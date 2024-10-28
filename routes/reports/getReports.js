const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");
const User = require("../../models/User");

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Lấy tất cả báo cáo hoặc lọc theo ngày, bao gồm cả những nhân viên chưa báo cáo trừ những nhân viên bị isActive = false
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
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   ngayBaoCao:
 *                     type: string
 *                     format: date
 *                   noiDungHomNay:
 *                     type: string
 *                   noiDungDuKienNgayMai:
 *                     type: string
 *                   IDnhanVien:
 *                     $ref: '#/components/schemas/User'
 */
router.get("/", async (req, res) => {
  const { date } = req.query;
  const query = {};

  if (date) {
    query.ngayBaoCao = date;
  }

  try {
    // Lấy danh sách tất cả nhân viên trừ những nhân viên bị isActive = false
    const allUsers = await User.find({ isActive: true });

    // Lấy danh sách báo cáo theo ngày (nếu có)
    const reports = await Report.find(query).populate("IDnhanVien");

    // Tạo một map để dễ dàng tra cứu báo cáo theo ID nhân viên
    const reportMap = new Map();
    reports.forEach((report) => {
      reportMap.set(report.IDnhanVien._id.toString(), report);
    });

    // Tạo danh sách kết quả bao gồm cả những nhân viên chưa báo cáo
    const result = allUsers.map((user) => {
      const report = reportMap.get(user._id.toString());
      return report
        ? report
        : {
            _id: null,
            ngayBaoCao: null,
            noiDungHomNay: null,
            noiDungDuKienNgayMai: null,
            IDnhanVien: user,
          };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
