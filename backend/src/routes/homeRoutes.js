const express = require("express");
const router = express.Router();

router.get("/welcome", (req, res) => {
  res.send("welcome to home route");
});

module.exports = router;
