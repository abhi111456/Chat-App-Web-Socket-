const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);  

io.on('connection', (socket) => {
    socket.on('user-message', (data) => {
        const selfData = { ...data, self: true };
        socket.emit('message', selfData); 
        socket.broadcast.emit('message', data); 
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(9000, () => console.log('Server started at PORT: 9000'));
