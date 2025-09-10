const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    // console.log(req);
    const findUser = await User.findOne({ _id: req.userInfo.userId });
    if (!findUser) {
      return res.status(401).json({
        error: true,
        message: "Can't find user.",
      });
    }

    return res.status(200).json({
      user: findUser,
      message: "About user",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    console.log("User error", e);
  }
};

module.exports = getUser;
