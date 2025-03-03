// db.js - Koneksi MySQL
const mysql = require('mysql');
const util = require('util');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'AppDatabase',
});

// Mengubah db.query menjadi Promise-based
db.query = util.promisify(db.query);

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;
