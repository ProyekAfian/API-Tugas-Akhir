// server.js - Entry Point
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
const userRoutes = require('./routes/userRoutes');
const seedRoutes = require('./routes/seedRoutes');
const dosenUpdateRoutes = require('./routes/DosenRoutes');
app.use('/api', userRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/dosen', dosenUpdateRoutes);

// Socket.IO real-time connection
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});