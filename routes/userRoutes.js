const express = require("express");
const router = express.Router();

// Import các route từ các file riêng biệt
const getUsers = require("./users/getUsers");
const createUser = require("./users/createUser");
const getUserById = require("./users/getUserById");
const updateUser = require("./users/updateUser");
const deleteUser = require("./users/deleteUser");

// Sử dụng các route
router.use("/", getUsers);
router.use("/", createUser);
router.use("/", getUserById);
router.use("/", updateUser);
router.use("/", deleteUser);

module.exports = router;
