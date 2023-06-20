const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register

const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.KEY),
  });
  const savedUser = await newUser.save();
  try {
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  !user && res.status(402).json({ message: "User not Found" });

  const hashed = CryptoJS.AES.decrypt(user.password, process.env.KEY);
  const passwordHash = hashed.toString(CryptoJS.enc.Utf8);
  passwordHash !== req.body.password &&
    res.status(401).json({ message: "Wrong Credentials" });

  const { password, ...others } = user._doc;
  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN_KEY
  );
  try {
    res.status(200).json({ ...others, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatecredentials = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  if (!updatedUser)
    return res.status(404).json({ message: "user does not exist" });
  try {
    res.status(200).json("User Updated");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, updatecredentials };
