const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db'); // Koneksi ke database

const router = express.Router();

// Endpoint untuk mengupdate password
router.put('/update-password', async (req, res) => {
  const { identifier, newPassword } = req.body;

  // Validasi input
  if (!identifier || !newPassword) {
    return res.status(400).json({
      status: false,
      message: 'Identifier and new password are required'
    });
  }

  // Enkripsi password baru
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Query untuk mengupdate password dan mengubah status update_password
  const updateQuery = 'UPDATE User SET password = ?, update_password = ? WHERE identifier = ?';

  db.query(updateQuery, [hashedPassword, true, identifier], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Database error',
        error: err
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'User not found'
      });
    }

    // Jika berhasil
    return res.json({
      status: true,
      message: 'Password updated successfully',
      data: {
        identifier,
        update_password: true
      }
    });
  });
});

module.exports = router;
