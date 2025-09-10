const express = require("express");
const router = express.Router();
const getUser = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddlewares");

router.get("/get-user", authMiddleware, getUser);

module.exports = router;
