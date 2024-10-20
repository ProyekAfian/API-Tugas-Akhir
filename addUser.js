const bcrypt = require('bcryptjs');
const db = require('./db'); // Koneksi database

const addUser = async () => {
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO User (identifier, password, role) VALUES (?, ?, ?)';
  db.query(query, ['18010001', hashedPassword, 'mahasiswa'], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      return;
    }
    console.log('User added successfully');
  });
};

addUser();
