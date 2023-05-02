const express = require("express");
const router = express.Router();

const { getBlocks } = require("../controllers/blockController");
// const checkAuth = require('../middleware/checkAuth');

router.get("/blocks", getBlocks);

module.exports = router;
