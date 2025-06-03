const db = require('../config/db')

const NotesModel = {

    async getAllNotes(){
        const query = `SELECT * FROM notes`;
        const [result] = await db.execute(query);
        return result;
    },

    async getNotesById(id){
        const query = `SELECT * FROM notes WHERE user_id = ?`
        const [result] = await db. execute(query, [id])
        return result;
    },

    async addNewNote(title, content, userId){
        const query = `INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)`;
        const [result] = await db.execute(query, [title, content, userId])
        return result;
    }
}

module.exports = NotesModel