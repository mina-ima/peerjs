const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();
app.use(cors());

// HTTPサーバー作成
const server = http.createServer(app);

// PeerJSサーバー設定
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

// 「/peerjs」でPeerJSサーバーにルーティング
app.use('/peerjs', peerServer);

// 接続イベントのログ
peerServer.on('connection', (client) => {
  console.log('Client connected:', client.id);
});

peerServer.on('disconnect', (client) => {
  console.log('Client disconnected:', client.id);
});

// ポートはRender互換のprocess.env.PORTを優先
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Express server with PeerJS is running on port ${PORT}`);
});

console.log('PeerJS server is starting...');