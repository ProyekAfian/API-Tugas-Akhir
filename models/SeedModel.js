const db = require('../db');
const defaultPassword = 'Password123';

const SeedModel = {
    seedRandomDosenAndMahasiswa: (callback) => {
        const queries = `
            INSERT INTO Dosen (NIDN, nama_dosen, jenis_kelamin, no_hp, informasi)
            SELECT CONCAT('NIDN', LPAD(FLOOR(RAND() * 10000), 4, '0')),
                   CONCAT('Dosen ', FLOOR(RAND() * 100)),
                   IF(RAND() > 0.5, 'L', 'P'),
                   CONCAT('08', FLOOR(RAND() * 1000000000)),
                   'Informasi Dosen'
            FROM DUAL
            LIMIT 10;

            INSERT INTO Mahasiswa (NIM, nama_dosen, user_name, jenis_kelamin)
            SELECT CONCAT('NIM', LPAD(FLOOR(RAND() * 10000), 4, '0')),
                   CONCAT('Mahasiswa ', FLOOR(RAND() * 100)),
                   CONCAT('user_', FLOOR(RAND() * 1000)),
                   IF(RAND() > 0.5, 'L', 'P')
            FROM DUAL
            LIMIT 10;
        `;
        db.query(queries, callback);
    },

    seedUsersFromDosenAndMahasiswa: (callback) => {
        const queries = `
            INSERT INTO User (identifier, password, user_name, role, password_updated)
            SELECT NIDN, '${defaultPassword}', nama_dosen, 'dosen', false
            FROM Dosen
            WHERE NIDN NOT IN (SELECT identifier FROM User);

            INSERT INTO User (identifier, password, user_name, role, password_updated)
            SELECT NIM, '${defaultPassword}', nama_dosen, 'mhs', false
            FROM Mahasiswa
            WHERE NIM NOT IN (SELECT identifier FROM User);
        `;
        db.query(queries, callback);
    }
};

module.exports = SeedModel;
