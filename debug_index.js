const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');
console.log('Index of sasaki2026Image.js:', html.indexOf('sasaki2026Image.js'));
