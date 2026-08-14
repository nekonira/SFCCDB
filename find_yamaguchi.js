const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const regex = /id:\s*'([^']+)',\s*name:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(code)) !== null) {
  if (match[2].includes('山口')) {
    console.log(`ID: ${match[1]}, Name: ${match[2]}`);
  }
}
