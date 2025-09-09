const Note = require("../models/Note");

// Add a new note
const addNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title) {
      return res.status(400).json({
        error: true,
        message: "Title is required.",
      });
    }
    if (!content) {
      return res.status(400).json({
        error: true,
        message: "Content is required.",
      });
    }

    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: req.userInfo.userId,
    });

    await note.save();
    if (note) {
      res.status(200).json({
        success: true,
        note,
        message: "Note created successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error, can't create note",
      });
    }
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: "Server error.",
    });
  }
};

//edit note
const editNote = async (req, res) => {
  try {
    const getNoteData = req.body;
    const getNoteId = req.params.id;
    const updateNote = await Note.findByIdAndUpdate(getNoteId, getNoteData, {
      new: true,
    });
    console.log(updateNote);
    if (updateNote) {
      res.status(200).json({
        success: true,
        message: "Note is updated successfully.",
        data: updateNote,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Error Updating Note",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again.",
      error: e.message,
    });
  }
};

module.exports = { addNote, editNote };
