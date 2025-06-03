const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')

const NotesController = require('../controller/C_Notes')

router.get('/getAllNotes', protect, NotesController.getAllNotes);

router.get('/getNotesById', protect, NotesController.getNotesById);

router.post('/addNewNote', protect, NotesController.addNewNote)

module.exports = router;