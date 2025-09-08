const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    if (!password) {
      res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Username is not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = loginUser;
