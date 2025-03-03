const express = require('express');
const { generateUsers } = require('../models/SeedModel');

const router = express.Router();

// Endpoint untuk generate user dari data mahasiswa dan dosen
router.post('/generate-users', async (req, res) => {
    try {
        const result = await generateUsers();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});

module.exports = router;
