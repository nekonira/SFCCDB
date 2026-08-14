const fs = require('fs');

const mock = fs.readFileSync('src/data/mockData.js', 'utf-8');
const appJs = fs.readFileSync('src/app.js', 'utf-8');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

console.log('mockData includes コ・ジェヒョン(2026):', mock.includes('コ・ジェヒョン(2026)'));
console.log('app.js includes コ・ジェヒョン:', appJs.includes('コ・ジェヒョン'));
console.log('app.jsx includes コ・ジェヒョン:', appJsx.includes('コ・ジェヒョン'));
