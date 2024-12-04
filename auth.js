const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.auth = async (req, res,next) => {
  try {
    //generate a bearer token

    const token = await req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is not generated. Please try again later.",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decode._id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid login credentials. Please select valid options",
      });
    }

    req.user = user;
    req.token = token;
    next() ;
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
