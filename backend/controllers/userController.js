//@desc Login a new user
//@route /api/login
//@access Private
const pool = require("../db.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator.js");

const loginUser = async (req, res) => {
  // 1. destructuring the req.body
  const { username, password } = req.body;
  // 2. check if user doesnt exist (if not then we throw an error)
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  if (user.rows.length === 0) {
    return res.status(401).send("Password or username is incorrect");
  }
  //   3. check if incoming password is the same the database password
  const validPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!validPassword) {
    return res.status(401).send("Password or Email is incorrect");
  }

  //   4. give the jwt token

  const token = jwtGenerator(user.rows[0].user_id);
  //   const token = await jwt.sign(username, process.env.jwtSecret, {
  //     expiresIn: '1hr',
  //   });
  res.status(200).json({
    id: user.rows[0].user_id,
    username: user.rows[0].username,
    age: user.rows[0].age,
    token: token,
  });
  //   res.json(token);
};

const registerUser = async (req, res) => {
  const { username, password, first_name, last_name, age } = req.body;

  if (!first_name || !last_name || !age || !username) {
    res.status(400).json({ message: "Please include all fields" });
  }

  //   делаем запрос на выборку всех user с данным email
  const userExist = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  //   проверяем существует ли user по username в базе данных
  if (userExist.rows.length !== 0) {
    res.status(400).json({ message: "User already exist" });
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

  //   генерируем jwt token

  //   res.json({ message: 'You are successfully registered', token });
};

module.exports = {
  loginUser,
  registerUser,
};
