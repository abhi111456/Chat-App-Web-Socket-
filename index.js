const { Server } = require('socket.io');
const http = require('http');

module.exports = (req, res) => {
  // Create an HTTP server
  const server = http.createServer((req, res) => {
    res.status(200).send('Server running...');
  });

  // Initialize Socket.io
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('user-message', (data) => {
      const selfData = { ...data, self: true };
      socket.emit('message', selfData);
      socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  // Start the server
  server.listen(3000, () => {
    console.log('Socket.IO server is running');
  });

  return server; // Return server for Vercel to handle
};
