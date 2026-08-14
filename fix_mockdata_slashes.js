const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let text = fs.readFileSync(mockPath, 'utf-8');

console.log('Fixing literal \\n in mockData.js...');
text = text.replace(/\\n/g, '\n');

fs.writeFileSync(mockPath, text, 'utf-8');
console.log('Saved clean mockData.js!');
