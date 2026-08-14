const fs = require('fs');
const path = require('path');
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const text = fs.readFileSync(mockPath, 'utf-8');
const lines = text.split('\n');
lines.forEach((line, i) => {
  if (line.includes('セアラ') || line.includes('Ceara') || line.includes('p115') || line.includes('5963')) {
    console.log(`Line ${i + 1}: ${line.trim()}`);
  }
});
