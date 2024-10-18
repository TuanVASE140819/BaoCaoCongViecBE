const express = require("express");
const router = express.Router();

// Import các route từ các file riêng biệt
const createNote = require("./notes/createNote");
const getNotes = require("./notes/getNotes");
const getNoteById = require("./notes/getNoteById");
const updateNote = require("./notes/updateNote");
const deleteNote = require("./notes/deleteNote");
const getNotesByReportId = require("./notes/getNotesByReportId"); // Import route mới

// Sử dụng các route
router.use("/", createNote);
router.use("/", getNotes);
router.use("/", getNoteById);
router.use("/", updateNote);
router.use("/", deleteNote);
router.use("/", getNotesByReportId); // Sử dụng route mới

module.exports = router;
