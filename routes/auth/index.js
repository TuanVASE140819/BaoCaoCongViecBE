const express = require("express");
const router = express.Router();

const register = require("./register");
const login = require("./login");
const userInfoByToken = require("./userInfoByToken");

router.use("/", register);
router.use("/", login);
router.use("/", userInfoByToken);

module.exports = router;
