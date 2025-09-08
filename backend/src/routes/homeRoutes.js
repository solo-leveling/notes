const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/add-note", authMiddleware, (req, res) => {
  // const { title, content, tags } = req.userInfo;
  // res.json({
  //   message: "Welcome to Home Route",
  //   user: {
  //     _id: userId,
  //     username: username,
  //   },
  // });
  // res.json(req.userInfo);
  // res.json(req.body);
  res.json(req.user);
});

module.exports = router;
