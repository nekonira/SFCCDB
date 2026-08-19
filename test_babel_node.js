const fs = require('fs');
const path = require('path');

const babelPath = path.join(__dirname, 'src', 'lib', 'babel.min.js');
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');

console.log('Loading Babel standalone from:', babelPath);
const Babel = require(babelPath);

console.log('Loading src/app.jsx...');
const appJsx = fs.readFileSync(appJsxPath, 'utf-8');

console.log('Transpiling src/app.jsx with Babel...');
try {
  const result = Babel.transform(appJsx, {
    presets: [['react', { runtime: 'classic' }]],
    filename: 'app.jsx'
  });
  console.log('SUCCESS! Babel transpiled app.jsx into pure JS! Output size:', result.code.length, 'bytes');
  
  // Write pure JS to src/app.js
  const appJsPath = path.join(__dirname, 'src', 'app.js');
  fs.writeFileSync(appJsPath, result.code, 'utf-8');
  console.log('Saved pure transpiled JS to src/app.js');
} catch (err) {
  console.error('BABEL TRANSPILE ERROR:', err.message);
  if (err.loc) {
    console.error('Location: line', err.loc.line, 'column', err.loc.column);
  }
}
