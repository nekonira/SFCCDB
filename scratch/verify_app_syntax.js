const fs = require('fs');

console.log('Testing app.js syntax...');
const code = fs.readFileSync('c:/Users/nekon/SFCCdeta/src/app.js', 'utf8');

try {
  new Function(code);
  console.log('app.js syntax is 100% valid!');
} catch (err) {
  console.error('Syntax error in app.js:', err);
}
