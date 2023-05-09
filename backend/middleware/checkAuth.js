const JWT = require("jsonwebtoken");
const pool = require("../db.js");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { user_id } = JWT.verify(token, "secret123");
    req.user = await pool.query(
      "SELECT user_id FROM users WHERE user_id = $1",
      [user_id]
    );
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Toke in not valid" });
  }
};

module.exports = requireAuth;
