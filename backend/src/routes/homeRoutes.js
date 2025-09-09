const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares");
const { addNote } = require("../controllers/noteController");
const router = express.Router();

router.post("/add-note", authMiddleware, addNote);

module.exports = router;
