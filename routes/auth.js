const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db'); // Import koneksi database

const router = express.Router();
const JWT_SECRET = 'mysecretkey';

// Endpoint login
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  // Query untuk mencari user berdasarkan identifier (NIM/NIP)
  const query = 'SELECT * FROM User WHERE identifier = ?'; // Gunakan identifier sebagai kolom

  db.query(query, [identifier], async (err, results) => {
    if (err) {
      return res.status(500).json({ status: false, message: 'Database error', error: err });
    }

    if (results.length === 0) {
      return res.status(400).json({ status: false, message: 'Invalid identifier or password' });
    }

    const user = results[0];

    // Cek apakah password cocok
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: 'Invalid identifier or password' });
    }

    // Buat token JWT jika login berhasil
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '5h' });

    // Ambil data tambahan berdasarkan role pengguna
    if (user.role === 'dosen') {
      // Jika user adalah dosen, ambil data dosen
      const dosenQuery = 'SELECT id AS id_dosen, nama_dosen, no_hp, jk, NIP FROM Dosen WHERE NIP = ?';
      db.query(dosenQuery, [identifier], (err, dosenResults) => {
        if (err) {
          return res.status(500).json({ status: false, message: 'Database error', error: err });
        }

        const dosenData = dosenResults[0];
        return res.json({
          status: true,
          message: 'Login successful',
          data: {
            role: user.role,
            id_dosen: dosenData.id_dosen,
            nama_dosen: dosenData.nama_dosen,
            no_hp: dosenData.no_hp,
            jk: dosenData.jk,
            nip: dosenData.NIP,  // Tambahkan NIP ke dalam data
            token,  // Masukkan token ke dalam data
            update_password: user.update_password,
          },
        });
      });
    } else if (user.role === 'mahasiswa') {
      // Jika user adalah mahasiswa, ambil data mahasiswa
      const mahasiswaQuery = 'SELECT id AS id_mahasiswa,nama_mahasiswa, jk, NIM FROM Mahasiswa WHERE NIM = ?';
      db.query(mahasiswaQuery, [identifier], (err, mahasiswaResults) => {
        if (err) {
          return res.status(500).json({ status: false, message: 'Database error', error: err });
        }

        const mahasiswaData = mahasiswaResults[0];
        return res.json({
          status: true,
          message: 'Login successful',
          data: {
            role: user.role,
            id_mahasiswa: mahasiswaData.id_mahasiswa,
            nama_mahasiswa: mahasiswaData.nama_mahasiswa,
            jk: mahasiswaData.jk,
            nim: mahasiswaData.NIM,  // Tambahkan NIM ke dalam data
            token,  // Masukkan token ke dalam data
            update_password: user.update_password,
          },
        });
      });
    } else {
      return res.status(400).json({ status: false, message: 'Unknown user role' });
    }
  });
});

module.exports = router;
