const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'liminal_notes'
})

db.getConnection()
    .then(() => {
        console.log('MySQL Connected')
    })
    .catch((err) => console.log('Connection error', err.message))

module.exports = db