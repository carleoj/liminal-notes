const asyncHandler = require('express-async-handler')

const NotesModel = require('../model/M_Notes')

const NotesController = {

    getAllNotes: asyncHandler(async (req, res) => {
        const result = await NotesModel.getAllNotes()
        res.status(200).json({
            data: result
        })
    }),

    getNotesById: asyncHandler(async (req, res) => {
        const note_id = req.user.id;
        const result = await NotesModel.getNotesById(note_id);
        res.status(200).json({data: result})
    }),

    addNewNote: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const { title, content } = req.body;

        if (!title || !content || !userId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await NotesModel.addNewNote(title, content, userId)
        res.status(200).json({
            message: 'Added new note.'
        })
    })
}

module.exports = NotesController