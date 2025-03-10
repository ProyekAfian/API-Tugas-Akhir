
// Model: DosenModel.js
const db = require('../db');

const DosenModel = {
    updateInformasi: async (nidn, informasi) => {
        const query = 'UPDATE dosen SET informasi = ? WHERE NIDN = ?';
        return db.query(query, [informasi, nidn]);
    },

    updateNoHp: async (nidn, no_hp) => {
        const query = 'UPDATE dosen SET no_hp = ? WHERE NIDN = ?';
        return db.query(query, [no_hp, nidn]);
    }
};

module.exports = DosenModel;