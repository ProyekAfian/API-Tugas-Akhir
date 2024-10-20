const express = require('express');
const db = require('../db'); // Koneksi database

const router = express.Router();

// Endpoint untuk mendapatkan jumlah dosen yang sedang aktif
router.get('/dosen/aktif', (req, res) => {
  const query = `
    SELECT l1.id_dosen, l1.location_status, l1.updated_at
    FROM location l1
    INNER JOIN (
      SELECT id_dosen, MAX(updated_at) as last_update
      FROM location
      GROUP BY id_dosen
    ) l2 ON l1.id_dosen = l2.id_dosen AND l1.updated_at = l2.last_update
    WHERE l1.location_status = true
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ status: false, message: 'Database error', error: err });
    }

    // Menghitung jumlah dosen yang sedang aktif (location_status = true)
    const jumlahDosenAktif = results.length;

    return res.json({
      status: true,
      message: 'Data retrieved successfully',
      jumlah_dosen: jumlahDosenAktif,
      detail_dosen: results, // Detail dosen yang aktif (jika diperlukan)
    });
  });
});

module.exports = router;
