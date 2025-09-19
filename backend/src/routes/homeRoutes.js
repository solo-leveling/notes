const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares");
const {
  addNote,
  editNote,
  deleteNote,
  showAllNotes,
  updatePinned,
  searchNote,
} = require("../controllers/noteController");
const router = express.Router();

router.post("/add-note", authMiddleware, addNote);
router.put("/edit-note/:id", authMiddleware, editNote);
router.put("/edit-pin/:id", authMiddleware, updatePinned);
router.delete("/delete-note/:id", authMiddleware, deleteNote);
router.get("/all-notes", authMiddleware, showAllNotes);
router.get("/search-note", authMiddleware, searchNote);

module.exports = router;
