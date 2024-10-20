const express = require('express');
const db = require('../db'); // Koneksi database

const router = express.Router();

// Endpoint untuk update lokasi dosen
router.post('/dosen/lokasi', (req, res) => {
  const { id_dosen, location_status, toggle_location } = req.body;
  const update_at = new Date(); // Timestamp saat data di-post

  // Query untuk insert data lokasi dosen
  const query = 'INSERT INTO location (id_Dosen, updated_at, location_status, toggle_location) VALUES (?, ?, ?, ?)';

  db.query(query, [id_dosen, update_at, location_status, toggle_location], (err, result) => {
    if (err) {
      return res.status(500).json({ status: false, message: 'Database error', error: err });
    }

    return res.json({ status: true, message: 'Location updated successfully' });
  });
});

module.exports = router;
