//@desc Login a new user
//@route /api/login
//@access Private

const loginUser = async (req, res) => {
    const { person, password } = req.body;
    if (person === 'admin' && password === '1234') {
      res.status(200).json({ person: 'admin', password: '1234' });
    } else {
      res.status(404).json({ message: 'Incorrect password or login' });
    }
  };
  
  module.exports = {
    loginUser,
  };
  