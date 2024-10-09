const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");

/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Tạo báo cáo mới
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       201:
 *         description: Báo cáo được tạo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       400:
 *         description: Lỗi khi tạo báo cáo
 */
router.post("/", async (req, res) => {
  const { ngayBaoCao, noiDungHomNay, noiDungDuKienNgayMai, IDnhanVien } =
    req.body;

  // Kiểm tra nếu ID nhân viên không được cung cấp
  if (!IDnhanVien) {
    return res.status(400).json({ message: "ID nhân viên là bắt buộc" });
  }

  const report = new Report({
    ngayBaoCao,
    noiDungHomNay,
    noiDungDuKienNgayMai,
    IDnhanVien,
  });

  try {
    const newReport = await report.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
