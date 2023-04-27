const express = require("express");
const router = express.Router();

const { getBlocks } = require("../controllers/blockController");

router.get("/blocks", getBlocks);

module.exports = router;
