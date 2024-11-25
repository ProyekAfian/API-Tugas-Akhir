const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const updatePasswordRouter = require('./routes/updatePassword'); // Import router update-password
const updateLokasi = require('./routes/update_lokasi');
const getInfo = require('./routes/get_info');
const adduser = require('./routes/addUser');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', updatePasswordRouter); 
app.use('/api', updateLokasi);
app.use('/api', getInfo);
app.use('/api', adduser);


// Root route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
