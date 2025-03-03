const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// User Login
router.post('/login', (req, res) => {
    const { identifier, password } = req.body;

    UserModel.login(identifier, password, (err, user) => {
        if (err) return res.status(500).json({ status: false, message: 'Database error' });

        if (user) {
            res.json({
                status: true,
                message: 'Login successful',
                data: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    password_updated: user.password_updated,
                }
            });
        } else {
            res.status(401).json({ status: false, message: 'Invalid credentials' });
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
            res.status(404).json({ status: false, message: 'User not found' });
        }
    });
});

module.exports = router;
