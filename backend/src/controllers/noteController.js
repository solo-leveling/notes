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
    const userId = req.userInfo.userId;
    const note = await Note.findById(getNoteId);

    if (note.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can't edit other ppl note.",
      });
    }

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

//delete note
const deleteNote = async (req, res) => {
  try {
    const getNoteId = req.params.id;
    const userId = req.userInfo.userId;
    const note = await Note.findById(getNoteId);

    if (note.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can't delete other ppl note.",
      });
    }

    const deleteData = await Note.findByIdAndDelete(getNoteId);

    if (deleteData) {
      return res.status(200).json({
        error: false,
        data: deleteData,
        message: "Note deleted successfully.",
      });
    } else {
      return res.status(404).json({
        error: true,
        message: "Can't find data.",
      });
    }
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: "Internal Server error.",
    });
  }
};

//get all notes
const showAllNotes = async (req, res) => {
  try {
    const getAllNotes = await Note.find({ userId: req.userInfo.userId }).sort({
      isPinned: -1,
    });
    console.log(getAllNotes);
    if (getAllNotes) {
      return res.status(200).json({
        error: false,
        data: getAllNotes,
        message: "All notes",
      });
    } else {
      return res.status(404).json({
        error: true,
        message: "Can't find data.",
      });
    }
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: "Internal Server error.",
    });
  }
};

//get note
const searchNote = async (req, res) => {
  // const { user } = req.userInfo.userId;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      error: true,
      message: "Search query is required.",
    });
  }

  try {
    const matchingNote = await Note.find({
      userId: req.userInfo.userId,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.status(200).json({
      error: false,
      message: "Notes matching the search query retrieved successfully",
      notes: matchingNote,
    });
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

//update pin
const updatePinned = async (req, res) => {
  try {
    const getNoteData = req.body;
    const getNoteId = req.params.id;
    const userId = req.userInfo.userId;
    const note = await Note.findById(getNoteId);

    if (note.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can't edit other ppl note.",
      });
    }

    const updateNote = await Note.findByIdAndUpdate(getNoteId, getNoteData, {
      new: true,
    });
    console.log(updateNote);
    if (updateNote) {
      res.status(200).json({
        success: true,
        message: "Pin is updated successfully.",
        data: updateNote,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Error Updating Pinned",
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

module.exports = {
  addNote,
  editNote,
  deleteNote,
  showAllNotes,
  updatePinned,
  searchNote,
};
