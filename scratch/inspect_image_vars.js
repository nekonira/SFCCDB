const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.includes('jimenez') || f.includes('Jimenez') || f.includes('shiotani') || f.includes('hatanaka'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  console.log(`${f}: ${content.substring(0, 100)}...`);
});
