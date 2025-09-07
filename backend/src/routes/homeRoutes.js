const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares");
const router = express.Router();

router.get("/welcome", authMiddleware, (req, res) => {
  const { username, userId } = req.userInfo;
  res.json({
    message: "Welcome to Home Route",
    user: {
      _id: userId,
      username: username,
    },
  });
});

module.exports = router;
