const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

exports.login = async (req, res) => {
  try {
    //fetch the email && password

    const { email, password } = req.body;

    //validate

    if (!email || !password) {
      return res.status(401).json({
        success: "All fields are required",
      });
    }

    //check for existing user

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists. Please create a new account",
      });
    }

    //check for password

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid login credentials. Please try again.",
      });
    }

    //generate a token

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      success: true,
      user,
      token,
      message: "User is successfully logged in",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
};
