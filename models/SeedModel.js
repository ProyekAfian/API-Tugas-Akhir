const bcrypt = require('bcryptjs');
const db = require('../db');

// Fungsi untuk generate user dari data mahasiswa dan dosen
async function generateUsers() {
    try {
        const mahasiswaQuery = `
            SELECT m.NIM AS identifier, m.nama_mahasiswa AS name, 'mahasiswa' AS role
            FROM Mahasiswa m
            LEFT JOIN User u ON m.NIM = u.identifier
            WHERE u.identifier IS NULL
        `;

        const dosenQuery = `
            SELECT d.NIDN AS identifier, d.nama_dosen AS name, 'dosen' AS role
            FROM Dosen d
            LEFT JOIN User u ON d.NIDN = u.identifier
            WHERE u.identifier IS NULL
        `;

        // Mengambil data mahasiswa dan dosen yang belum ada di tabel User
        const mahasiswaData = await db.query(mahasiswaQuery);
        const dosenData = await db.query(dosenQuery);

        const usersToInsert = [...mahasiswaData, ...dosenData];

        if (usersToInsert.length === 0) {
            return {
                status: true,
                message: 'All users are already in the database.',
            };
        }

        const hashedPassword = await bcrypt.hash('Password123', 10);

        // Query untuk memasukkan data ke tabel User dengan kolom username baru
        const insertQuery = `
            INSERT INTO User (identifier, user_name, password, role, password_updated)
            VALUES ?
        `;

        // Membuat nilai-nilai untuk diinsert, termasuk username
        const values = usersToInsert.map(user => [
            user.identifier,
            user.name.toLowerCase().replace(/\s/g, ''), // Membuat username dari name
            hashedPassword,
            user.role,
            false,
        ]);

        await db.query(insertQuery, [values]);

        return {
            status: true,
            message: 'Users successfully generated and added to the database.',
            generated_users: usersToInsert,
        };
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while generating users.');
    }
}

module.exports = { generateUsers };
