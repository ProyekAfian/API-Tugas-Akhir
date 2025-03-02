const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// User Login
router.post('/login', (req, res) => {
    const { identifier, password } = req.body;
    UserModel.login(identifier, password, (err, results) => {
        if (err) return res.status(500).json({ status: false, message: 'Database error' });
        if (results.length > 0) {
            res.json({ status: true, message: 'Login successful', data: results[0] });
        } else {
            res.json({ status: false, message: 'Invalid credentials' });
        }
    });
});

// Update Password
router.put('/update-password', (req, res) => {
    const { user_id, newPassword } = req.body;
    UserModel.updatePassword(user_id, newPassword, (err, results) => {
        if (err) return res.status(500).json({ status: false, message: 'Database error' });
        if (results.affectedRows > 0) {
            res.json({ status: true, message: 'Password updated successfully' });
        } else {
            res.json({ status: false, message: 'User not found' });
        }
    });
});

module.exports = router;
