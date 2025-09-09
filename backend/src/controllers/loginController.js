const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
      return res.status(400).json({
        success: false,
        message: "Username or email and password are required",
      });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [username ? { username } : {}, email ? { email } : {}],
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
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
