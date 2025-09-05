const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
      });
    }

    //check Email is already used or not
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({
        error: true,
        message: "Email is already registered",
      });
    }

    //create new User
    const user = new User({ fullName, email, password });
    await user.save();

    //give access limit time
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    //register successful
    res.status(201).json({
      error: false,
      user,
      accessToken,
      message: "Registration Successful",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Server error",
    });
  }
};
