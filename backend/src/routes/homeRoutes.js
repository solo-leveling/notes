const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares");
const { addNote, editNote } = require("../controllers/noteController");
const router = express.Router();

router.post("/add-note", authMiddleware, addNote);
router.put("/edit-note/:id", authMiddleware, editNote);

module.exports = router;
