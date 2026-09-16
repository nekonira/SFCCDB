const fs = require('fs');

global.window = global;
global.self = global;
global.this = global;

const babelJs = fs.readFileSync('c:/Users/nekon/SFCCdeta/src/lib/babel.min.js', 'utf8');
const moduleObj = { exports: {} };
const fn = new Function('module', 'exports', 'global', 'window', 'self', babelJs);
fn(moduleObj, moduleObj.exports, global, global, global);

const BabelObj = moduleObj.exports.Babel || global.Babel || moduleObj.exports;

console.log('Transpiling app.jsx with runtime: classic...');
const code = fs.readFileSync('c:/Users/nekon/SFCCdeta/src/app.jsx', 'utf8');

const result = BabelObj.transform(code, {
  presets: [
    ['react', { runtime: 'classic' }]
  ]
});

fs.writeFileSync('c:/Users/nekon/SFCCdeta/src/app.js', result.code, 'utf8');
console.log('Successfully transpiled app.jsx to pure standalone app.js! Size:', result.code.length, 'bytes');

// Check first 300 chars of app.js
console.log('Header snippet of app.js:\n', result.code.slice(0, 300));
