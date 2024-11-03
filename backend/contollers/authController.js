const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json("all  filed are  required");
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json("user already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashPassword,
      role,
    });
    return res
      .status(201)
      .json({ msg: ` user created successfully with username:${username}` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password} = req.body;
    if (!username || !password) {
      return res.status(400).json("all  filed are  required");
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "invalid username or password" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(400).json({ msg: "invalid username or password" });
    }

    const payload = {
      id: user._id, 
      username:user.username,
      role: user.role, // add role here
    };

    const token=jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
    
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = { registerUser, loginUser };
