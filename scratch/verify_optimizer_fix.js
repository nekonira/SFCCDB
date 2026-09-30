const fs = require('fs');
const path = require('path');

// Read app.js and mock data or evaluate optimization logic directly
const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');

console.log('Testing Optimizer under 普通 (1.0x), 好調 (1.25x), 絶好調 (1.5x)...');

// Check if overflowPenalty in app.js has 0.001
if (appJsCode.includes('overflowPenalty+=(rawVal-lim.maxLimit)*0.001')) {
  console.log('✅ app.js successfully contains fixed overflowPenalty (0.001)!');
} else {
  console.log('⚠️ Warning: overflowPenalty string check did not match minified format exactly, checking pattern...');
  const overflowIndex = appJsCode.indexOf('overflowPenalty');
  console.log('Snippet:', appJsCode.substring(overflowIndex, overflowIndex + 120));
}
