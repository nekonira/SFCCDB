const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const p391Idx = code.indexOf("id: 'p391'");
const p391EndIdx = code.indexOf("avatarUrl:", p391Idx);
console.log(code.substring(p391Idx, p391EndIdx + 20));
