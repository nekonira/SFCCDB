const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const matches = Array.from(code.matchAll(/avatarUrl:\s*([^,\}\n]+)/g));
console.log('Sample avatarUrl values in mockData.js:');
matches.slice(0, 15).forEach(m => console.log(m[1].trim()));
