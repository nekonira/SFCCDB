const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p105Idx = mockCode.indexOf("id: 'p105'");
const p106Idx = mockCode.indexOf("id: 'p106'");

console.log('p105Idx:', p105Idx, 'p106Idx:', p106Idx);
console.log('Snippet between p105 and p106:');
console.log(mockCode.substring(p105Idx, p106Idx + 50));
