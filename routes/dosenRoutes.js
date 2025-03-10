// Routes: Dosen Update APIs
const express = require('express');
const router = express.Router();
const DosenModel = require('../models/DosenModel');

// Update informasi (hanya kolom informasi saja) berdasarkan NIDN
router.put('/update-informasi/:nidn', async (req, res) => {
    const { nidn } = req.params;
    const { informasi } = req.body;
    try {
        const result = await DosenModel.updateInformasi(nidn, informasi);
        if (result.affectedRows > 0) {
            res.json({ status: true, message: 'Informasi berhasil diperbarui' });
        } else {
            res.status(404).json({ status: false, message: 'Data dosen tidak ditemukan' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Terjadi kesalahan pada server' });
    }
});

// Update nomor telepon dosen berdasarkan NIDN
router.put('/update-nohp/:nidn', async (req, res) => {
    const { nidn } = req.params;
    const { no_hp } = req.body;
    try {
        const result = await DosenModel.updateNoHp(nidn, no_hp);
        if (result.affectedRows > 0) {
            res.json({ status: true, message: 'Nomor telepon berhasil diperbarui' });
        } else {
            res.status(404).json({ status: false, message: 'Data dosen tidak ditemukan' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Terjadi kesalahan pada server' });
    }
});

module.exports = router;
