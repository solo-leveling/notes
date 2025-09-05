const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    //check user is already registered or not
    const checkExistingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email is already existed.",
      });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user and save
    const createNewUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await createNewUser.save();
    if (createNewUser) {
      res.status(200).json({
        success: true,
        message: "User created successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Error, can't create account",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "SOmething wrong",
    });
    console.log("Registration error", e);
  }
};

module.exports = registerUser;
