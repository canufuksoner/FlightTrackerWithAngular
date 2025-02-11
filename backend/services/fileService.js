const fs = require('fs');
const coordinatesFile = 'coordinates.json';

const loadCoordinates = (callback) => {
  fs.readFile(coordinatesFile, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading coordinates: ${err.message}`);
      callback([]);
      return;
    }
    try {
      const coordinates = JSON.parse(data);
      console.log('Coordinates data loaded');
      callback(coordinates);
    } catch (error) {
      console.error(`Error parsing coordinates: ${error.message}`);
      callback([]);
    }
  });
};

module.exports = {
  loadCoordinates
};
