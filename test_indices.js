const fs = require('fs');
const appJsCode = fs.readFileSync('src/app.js', 'utf-8');

const startIdx = appJsCode.indexOf('const getPlayerAvatarUrl =');
const endIdx = appJsCode.indexOf('const generateDefaultAvatar =');

console.log('Start index:', startIdx);
console.log('End index:', endIdx);
console.log('Snippet length:', endIdx - startIdx);
