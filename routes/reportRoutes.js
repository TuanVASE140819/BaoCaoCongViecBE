const express = require("express");
const router = express.Router();

// Import các route từ các file riêng biệt
const getReports = require("./reports/getReports");
const createReport = require("./reports/createReport");
const getReportById = require("./reports/getReportById");
const updateReport = require("./reports/updateReport");
const deleteReport = require("./reports/deleteReport");
const getReportsByEmployeeIdAndDate = require("./reports/getReportsByEmployeeIdAndDate");

// Sử dụng các route
router.use("/", getReports);
router.use("/", createReport);
router.use("/", getReportById);
router.use("/", updateReport);
router.use("/", deleteReport);
router.use("/", getReportsByEmployeeIdAndDate);

module.exports = router;
