// const JWT = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

// module.exports = async (req, res, next) => {
//   const token = req.header('x-auth-token');
//   if (!token) {
//     return res.status(400).json({
//       errors: [
//         {
//           msg: 'No token found',
//         },
//       ],
//     });
//   }
//   try {
//     let user = JWT.verify(token, process.env.jwtSecret);
//     req.user = user.username;
//     next();
//   } catch (error) {
//     return res.status(400).json({
//       errors: [
//         {
//           msg: 'token is invalid',
//         },
//       ],
//     });
//   }
// };

const JWT = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      return res.status(401).json({ message: "Auth error" });
    }
    const decoded = JWT.verify(token, process.env.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth error" });
  }
};
