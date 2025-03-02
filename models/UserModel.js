const db = require('../db');

const UserModel = {
    login: (identifier, password, callback) => {
        const query = 'SELECT * FROM User WHERE identifier = ? AND password = ?';
        db.query(query, [identifier, password], callback);
    },
    updatePassword: (user_id, newPassword, callback) => {
        const query = 'UPDATE User SET password = ?, password_updated = ? WHERE user_id = ?';
        db.query(query, [newPassword, true, user_id], callback);
    }
};

module.exports = UserModel;
