const pool = require("../db.js");

const getBlocks = async (req, res) => {
  const blocks = await pool.query("SELECT * FROM blocks2");
  res.json(blocks.rows);
};

module.exports = {
  getBlocks,
};
