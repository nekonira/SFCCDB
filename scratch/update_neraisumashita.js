const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating 狙いすました強振 description in mockData.js ---');

// Replace description for Silver 狙いすました強振 (and specifically for p390 or any Silver 狙いすました強振)
const oldStr = `      {
        name: '狙いすました強振',
        rank: '銀',
        description: '発動条件：絶好調　/　キック力・冷静さUP'
      }`;

const newStr = `      {
        name: '狙いすました強振',
        rank: '銀',
        description: '発動条件：好調　/　キック力・冷静さUP'
      }`;

if (code.includes(oldStr)) {
  code = code.replace(oldStr, newStr);
  fs.writeFileSync(mockPath, code, 'utf-8');
  console.log('SUCCESS! Updated exact matching block in mockData.js');
} else {
  // Regex replacement for any Silver 狙いすました強振
  const updatedCode = code.replace(
    /(name:\s*['"]狙いすました強振['"],\s*rank:\s*['"]銀['"],\s*description:\s*['"])[^'"]+(['"])/g,
    '$1発動条件：好調　/　キック力・冷静さUP$2'
  );
  fs.writeFileSync(mockPath, updatedCode, 'utf-8');
  console.log('SUCCESS! Updated via regex in mockData.js');
}
