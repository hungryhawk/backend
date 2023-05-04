//@desc Login a new user
//@route /api/login
//@access Private
const pool = require("../db.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator.js");
const { validationResult } = require("express-validator");

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }
  // 1. destructuring the req.body
  const { username, password } = req.body;
  // 2. check if user doesnt exist (if not then we throw an error)
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  if (user.rows.length === 0) {
    return res
      .status(401)
      .json({ message: "Password or username is incorrect" });
  }
  //   3. check if incoming password is the same the database password
  const validPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!validPassword) {
    return res.status(401).json({ message: "Password or Email is incorrect" });
  }

  //   4. give the jwt token

  const token = jwtGenerator(user.rows[0].user_id);
  //   const token = await jwt.sign(username, process.env.jwtSecret, {
  //     expiresIn: '1hr',
  //   });
  // res.status(200).json({
  //   id: user.rows[0].user_id,
  //   username: user.rows[0].username,
  //   age: user.rows[0].age,
  //   token: token,
  // });
  res.status(200).json({ token: token });
};

const registerUser = async (req, res) => {
  const { username, password, first_name, last_name, age, confirmPassword } =
    req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }

  //   if (password !== confirmPassword) {
  //     return res.status(400).json({ message: 'Passwords does not match' });
  //   }

  //   if (first_name.length < 3) {
  //     return res
  //       .status(400)
  //       .json({ message: 'first name should contain at least 3 character' });
  //   }
  //   if (last_name.length < 3) {
  //     return res
  //       .status(400)
  //       .json({ message: 'last name should contain at least 3 character' });
  //   }

  //   делаем запрос на выборку всех user с данным email
  const userExist = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  //   проверяем существует ли user по username в базе данных
  if (userExist.rows.length !== 0) {
    return res.status(400).json({ message: "User already exist" });
  }

  //   хэшируем пароль
  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(password, salt);

  //   добавляем usera в базу данных

  const newUser = await pool.query(
    "INSERT INTO users (username, password, first_name, last_name, age) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [username, bcryptPassword, first_name, last_name, age]
  );

  const token = jwtGenerator(newUser.rows[0].user_id);

  //   показываем usera при добавлении
  if (newUser.rows[0]) {
    res.status(201).json({
      id: newUser.rows[0].user_id,
      username: newUser.rows[0].username,
      age: newUser.rows[0].age,
      token: token,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
