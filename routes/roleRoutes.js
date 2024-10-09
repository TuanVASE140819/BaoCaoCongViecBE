const express = require("express");
const router = express.Router();

// Import các route từ các file riêng biệt
const getRoles = require("./roles/getRoles");
const createRole = require("./roles/createRole");
const getRoleById = require("./roles/getRoleById");
const updateRole = require("./roles/updateRole");
const deleteRole = require("./roles/deleteRole");

// Sử dụng các route
router.use("/", getRoles);
router.use("/", createRole);
router.use("/", getRoleById);
router.use("/", updateRole);
router.use("/", deleteRole);

module.exports = router;
