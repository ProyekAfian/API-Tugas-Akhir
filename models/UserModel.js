const bcrypt = require('bcryptjs');
const db = require('../db');

const UserModel = {
    // Fungsi login dengan validasi password menggunakan bcrypt
    login: async (identifier, inputPassword, callback) => {
        try {
            const query = 'SELECT * FROM User WHERE identifier = ?';
            db.query(query, [identifier], async (err, results) => {
                if (err) return callback(err, null);

                if (results.length > 0) {
                    const user = results[0];
                    // Bandingkan password input dengan hash di database
                    const isPasswordValid = await bcrypt.compare(inputPassword, user.password);
                    if (isPasswordValid) {
                        callback(null, user);
                    } else {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    },

    // Fungsi update password dengan hashing menggunakan bcrypt
    updatePassword: async (user_id, newPassword, callback) => {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const query = 'UPDATE User SET password = ?, password_updated = ? WHERE user_id = ?';
            db.query(query, [hashedPassword, true, user_id], callback);
        } catch (error) {
            callback(error, null);
        }
    },

    // Fungsi untuk memperbarui informasi pengguna
    updateInformation: async (user_id, name, username, callback) => {
        const query = 'UPDATE User SET name = ?, username = ? WHERE id = ?';
        db.query(query, [name, username, user_id], callback);
    },

    // Fungsi untuk memperbarui nomor NIDN dosen
    updateNIDN: async (user_id, newNIDN, callback) => {
        const query = 'UPDATE User SET identifier = ? WHERE id = ? AND role = "dosen"';
        db.query(query, [newNIDN, user_id], callback);
    }




};

module.exports = UserModel;
