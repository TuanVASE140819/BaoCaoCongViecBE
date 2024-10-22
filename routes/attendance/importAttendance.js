const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const Attendance = require("../../models/Attendance");

const router = express.Router();

// Cấu hình multer để lưu trữ file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/attendance/import:
 *   post:
 *     summary: Import dữ liệu chấm công từ file Excel
 *     tags: [Attendance]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: File Excel chứa dữ liệu chấm công
 *     responses:
 *       200:
 *         description: Import dữ liệu thành công
 *       400:
 *         description: Lỗi khi import dữ liệu
 */
router.post("/import", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Đọc dữ liệu từ file Excel
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Lưu dữ liệu vào cơ sở dữ liệu
    await Attendance.insertMany(jsonData);

    res.status(200).json({ message: "Import dữ liệu thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi import dữ liệu", error });
  }
});

module.exports = router;
