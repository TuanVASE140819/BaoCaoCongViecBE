const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");

/**
 * @swagger
 * /api/reports/{id}:
 *   put:
 *     summary: Cập nhật báo cáo
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của báo cáo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       400:
 *         description: Lỗi khi cập nhật báo cáo
 *       404:
 *         description: Không tìm thấy báo cáo
 */
router.put("/:id", async (req, res) => {
  const { ngayBaoCao, noiDungHomNay, noiDungDuKienNgayMai, IDnhanVien } =
    req.body;
  try {
    const report = await Report.findById(req.params.id);
    if (!report)
      return res.status(404).json({ message: "Không tìm thấy báo cáo" });

    report.ngayBaoCao = ngayBaoCao;
    report.noiDungHomNay = noiDungHomNay;
    report.noiDungDuKienNgayMai = noiDungDuKienNgayMai;
    report.IDnhanVien = IDnhanVien;
    const updatedReport = await report.save();
    res.json(updatedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
