const fs = require('fs');

const content = fs.readFileSync('src/data/mockData.js', 'utf8');

// Match first player object
const match = content.match(/\{\s*id:\s*['"]p01['"][\s\S]*?\n\s*\}/);
if (match) {
  console.log('Sample Player p01:');
  console.log(match[0].slice(0, 500));
} else {
  // Let's find any player object
  const anyMatch = content.match(/\{\s*id:\s*['"]p\d+['"][\s\S]*?\n\s*\}/);
  if (anyMatch) {
    console.log('Sample Player:', anyMatch[0].slice(0, 500));
  }
}
