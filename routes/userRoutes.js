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
router.delete("/:id", deleteUser);
router.put("/:id", updateUser); // Đảm bảo rằng route updateUser được định nghĩa
router.get("/:id", getUserById);
router.get("/", getUsers);

module.exports = router;
