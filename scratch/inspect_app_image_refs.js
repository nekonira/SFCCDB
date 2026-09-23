const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'app.js');
const appCode = fs.readFileSync(appPath, 'utf-8');

const matches = Array.from(appCode.matchAll(/window\.[A-Z0-9_]+_IMAGE/g)).map(m => m[0]);
console.log(`Total window.*_IMAGE references in app.js: ${matches.length}`);
console.log('Sample references:', Array.from(new Set(matches)).slice(0, 15));
