module.exports = (req, res, next) => {
  const { username, password, first_name, last_name, age } = req.body;

  function validUsername(userName) {
    return /^(?=^[^_]+_?[^_]+$)\w{3,20}$/.test(userName);
  }

  if (req.path === "/register") {
    if (![username, password, first_name, last_name, age].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validUsername(username)) {
      return res.status(401).json("Invalid username");
    }
  } else if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validUsername(username)) {
      return res.status(401).json("Invalid username");
    }
  }
  next();
};
