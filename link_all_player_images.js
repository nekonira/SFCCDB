const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js'));

console.log(`FOUND ${files.length} PLAYER IMAGE JS FILES IN src/data/!`);
console.log('Sample image files:', files.slice(0, 10).join(', '));
