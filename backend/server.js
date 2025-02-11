const WebSocket = require('ws');
const { handleConnection } = require('./services/websocketService');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  handleConnection(ws);
});

wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});

console.log('WebSocket server started on port 8080');
