const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', socket => {
  socket.on('message', msg => {
    let data;
    try {
      data = JSON.parse(msg);
    } catch (err) {
      console.error('Invalid message:', msg);
      return;
    }

    // Broadcast to all other clients
    wss.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log("✅ WebSocket signaling server is running on port 3000");


