console.log("The video call server is starting up...");

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// This tells the browser to use your HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// The "Global Lobby" Logic
io.on('connection', (socket) => {
  console.log('A user has joined the lobby!');

  // When someone joins, tell everyone else to "connect" their video
  socket.broadcast.emit('user-joined', socket.id);

  socket.on('disconnect', () => {
    console.log('A user left the room.');
  });
});

// This starts the server on Port 3000
http.listen(3000, () => {
  console.log('--- SERVER READY ---');
  console.log('Open your browser and go to: http://localhost:3000');
});