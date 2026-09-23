const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js'));
console.log(`Total Image.js files: ${files.length}`);
console.log('Sample Image.js files:', files.slice(0, 10));
