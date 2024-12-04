const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    //fetch the data

    const { username, email, password } = req.body;

    //validate

    if (!username || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check for existing user

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //hash the password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user and store the entry in db

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      data: newUser,
      message: "New user created successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
};
