const fs = require('fs');
const path = require('path');
const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const matches = Array.from(code.matchAll(/id:\s*['"]p(\d+)['"]/g));
if (matches.length > 0) {
  const lastMatch = matches[matches.length - 1];
  console.log(`Total player IDs found: ${matches.length}`);
  console.log(`Last player ID: p${lastMatch[1]}`);
} else {
  console.log('No player IDs found.');
}
