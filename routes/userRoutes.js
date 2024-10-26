const express = require("express");
const router = express.Router();

// Import các route từ các file riêng biệt
const getBirthdaysByMonth = require("./users/getBirthdaysByMonth");
const createUser = require("./users/createUser");
const deleteUser = require("./users/deleteUser");
const updateUser = require("./users/updateUser");
const getUserById = require("./users/getUserById");
const getUsers = require("./users/getUsers");

// Định nghĩa các route
router.use("/birthdays", getBirthdaysByMonth); // Đặt route này trước các route khác có thể gây xung đột
router.use("/", createUser);
router.use("/:id", deleteUser);
router.use("/:id", updateUser);
router.use("/:id", getUserById);
router.use("/", getUsers);

module.exports = router;
