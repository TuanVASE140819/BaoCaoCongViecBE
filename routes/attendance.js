const express = require("express");
const router = express.Router();

// Import các route từ các file riêng biệt
const createAttendance = require("./attendance/createAttendance");
const getAttendance = require("./attendance/getAttendance");
const updateAttendance = require("./attendance/updateAttendance");
const deleteAttendance = require("./attendance/deleteAttendance");
const importAttendance = require("./attendance/importAttendance");

// Sử dụng các route
router.use("/", createAttendance);
router.use("/", getAttendance);
router.use("/", updateAttendance);
router.use("/", deleteAttendance);
router.use("/", importAttendance);

module.exports = router;
