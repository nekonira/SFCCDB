const fs = require('fs');
const path = require('path');

const appJsCode = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');

const hasBrLogic = appJsCode.includes('React.createElement("br", null)');
const hasWhitespaceNormal = appJsCode.includes('whitespace-normal');

console.log('--- Verification of Line Break Label Formatting ---');
console.log('1. br element present for mixed GK/FP row header:', hasBrLogic ? 'PASS' : 'FAIL');
console.log('2. whitespace-normal present to allow multi-line text:', hasWhitespaceNormal ? 'PASS' : 'FAIL');

if (hasBrLogic && hasWhitespaceNormal) {
  console.log('=== ALL LINE BREAK FORMATTING TESTS PASSED ===');
} else {
  console.error('=== TESTS FAILED ===');
  process.exit(1);
}
