const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// Check where CardCompareModal is defined in src/app.jsx
const idx = content.indexOf('function CardCompareModal');
console.log('CardCompareModal index:', idx);
