const express = require("express");
const router = express.Router();
const Attendance = require("../../models/Attendance");

/**
 * @swagger
 * /api/attendance/{id}:
 *   put:
 *     summary: Cập nhật thông tin chấm công
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của chấm công
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Lỗi khi cập nhật chấm công
 *       404:
 *         description: Không tìm thấy chấm công
 */
router.put("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!attendance) {
      return res.status(404).send();
    }
    res.send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
