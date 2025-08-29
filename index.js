const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
  console.log('Client connected:', client.id);
});

peerServer.on('disconnect', (client) => {
  console.log('Client disconnected:', client.id);
});

server.listen(process.env.PORT || 9000, () => {
  console.log(`Express server with PeerJS is running on port ${process.env.PORT || 9000}`);
});

console.log('PeerJS server is starting...');