const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db'); // Import koneksi database

const router = express.Router();

// Endpoint untuk generate user dari data mahasiswa dan dosen
router.post('/generate-users', async (req, res) => {
  try {
    // Query untuk mengambil data mahasiswa yang belum ada di tabel User
    const mahasiswaQuery = `
      SELECT m.NIM AS identifier, m.nama_mahasiswa AS name, 'mahasiswa' AS role
      FROM Mahasiswa m
      LEFT JOIN User u ON m.NIM = u.identifier
      WHERE u.identifier IS NULL
    `;

    // Query untuk mengambil data dosen yang belum ada di tabel User
    const dosenQuery = `
      SELECT d.NIP AS identifier, d.nama_dosen AS name, 'dosen' AS role
      FROM Dosen d
      LEFT JOIN User u ON d.NIP = u.identifier
      WHERE u.identifier IS NULL
    `;

    // Jalankan query untuk mahasiswa dan dosen
    const mahasiswaData = await new Promise((resolve, reject) => {
      db.query(mahasiswaQuery, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    const dosenData = await new Promise((resolve, reject) => {
      db.query(dosenQuery, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    // Gabungkan data mahasiswa dan dosen
    const usersToInsert = [...mahasiswaData, ...dosenData];

    if (usersToInsert.length === 0) {
      return res.json({
        status: true,
        message: 'All users are already in the database.',
      });
    }

    // Hash password default
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Generate query untuk memasukkan data ke tabel User
    const insertQuery = `
      INSERT INTO User (identifier, password, role, update_password)
      VALUES ?
    `;

    // Format data untuk query insert
    const values = usersToInsert.map(user => [
      user.identifier,
      hashedPassword,
      user.role,
      false, // Default: Belum update password
    ]);

    // Eksekusi query insert
    await new Promise((resolve, reject) => {
      db.query(insertQuery, [values], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Response sukses
    res.json({
      status: true,
      message: 'Users successfully generated and added to the database.',
      generated_users: usersToInsert,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while generating users.',
      error,
    });
  }
});

module.exports = router;
