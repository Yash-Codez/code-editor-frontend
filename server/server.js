const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { YSocketIO } = require('y-socket.io/dist/server');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // In production, restrict this to your frontend URL
    methods: ["GET", "POST"]
  }
});

// Initialize YSocketIO to handle Yjs document syncing over Socket.io
const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();

ySocketIO.on('document-loaded', (doc) => {
  console.log(`Document loaded: ${doc.name}`);
});

ySocketIO.on('document-update', (doc, update) => {
  // Fired when a document gets updated
});

ySocketIO.on('awareness-update', (doc, update) => {
  // Fired when awareness (cursors/selection) updates
});

ySocketIO.on('document-destroy', (doc) => {
  console.log(`Document destroyed: ${doc.name}`);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
