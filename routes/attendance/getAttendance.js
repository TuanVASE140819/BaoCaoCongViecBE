const express = require("express");
const router = express.Router();
const Attendance = require("../../models/Attendance");

/**
 * @swagger
 * /api/attendance/{id}:
 *   get:
 *     summary: Lấy thông tin chấm công theo ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của chấm công
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Không tìm thấy chấm công
 */
router.get("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).send();
    }
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
