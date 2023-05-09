const JWT = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };
  return JWT.sign(payload, process.env.jwtSecret, { expiresIn: "15sec" });
}

module.exports = jwtGenerator;
