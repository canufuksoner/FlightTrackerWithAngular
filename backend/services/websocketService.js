const fs = require('fs');

const loadCoordinates = require('./fileService').loadCoordinates;

let coordinates = [];

loadCoordinates((loadedCoordinates) => {
  coordinates = loadedCoordinates;
});

const handleConnection = (ws) => {
  console.log('Client connected');

  let i = 0;
  const interval = setInterval(() => {
    if (i < coordinates.length) {
      ws.send(JSON.stringify(coordinates[i]));
      i++;
    } else {
      clearInterval(interval);
      ws.close();
    }
  }, 50);

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clearInterval(interval);
  });
};

module.exports = {
  handleConnection
};
