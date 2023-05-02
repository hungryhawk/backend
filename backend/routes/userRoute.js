const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/userController");
const validInfo = require("../middleware/validInfo.js");

router.post("/login", validInfo, loginUser);

router.post("/register", validInfo, registerUser);

module.exports = router;
