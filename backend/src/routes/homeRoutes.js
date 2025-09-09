const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares");
const {
  addNote,
  editNote,
  deleteNote,
  showAllNotes,
} = require("../controllers/noteController");
const router = express.Router();

router.post("/add-note", authMiddleware, addNote);
router.put("/edit-note/:id", authMiddleware, editNote);
router.delete("/delete-note/:id", authMiddleware, deleteNote);
router.get("/all-notes", authMiddleware, showAllNotes);

module.exports = router;
