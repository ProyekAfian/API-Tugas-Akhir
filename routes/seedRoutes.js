const express = require('express');
const router = express.Router();
const SeedModel = require('../models/SeedModel');

// Seed Random Dosen and Mahasiswa Data
router.post('/seed-random-data', (req, res) => {
    SeedModel.seedRandomDosenAndMahasiswa((err, results) => {
        if (err) return res.status(500).json({ status: false, message: 'Database error' });
        res.json({ status: true, message: 'Random data seeded successfully' });
    });
});

// Seed Users from Dosen and Mahasiswa
router.post('/seed-users', (req, res) => {
    SeedModel.seedUsersFromDosenAndMahasiswa((err, results) => {
        if (err) return res.status(500).json({ status: false, message: 'Database error' });
        res.json({ status: true, message: 'Users seeded successfully' });
    });
});

module.exports = router;
