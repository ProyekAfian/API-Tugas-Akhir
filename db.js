// db.js
const mysql = require('mysql2');

// Konfigurasi koneksi MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Sesuaikan dengan password database Anda
  database: 'amin' // Ganti dengan nama database Anda
});

// Buat koneksi ke database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = connection;
