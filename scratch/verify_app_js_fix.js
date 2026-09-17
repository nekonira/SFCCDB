const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'src', 'app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf-8');

console.log('Checking compiled app.js file...');

if (appJsCode.includes('isReqSideAttacker') && appJsCode.includes('isReqAttacker')) {
  console.log('✅ app.js contains the updated checkSingleBonusMatch logic!');
} else {
  console.error('❌ app.js does NOT contain the fix!');
  process.exit(1);
}

// Search for checkSingleBonusMatch snippet in app.js
const idx = appJsCode.indexOf('function checkSingleBonusMatch');
if (idx !== -1) {
  const snippet = appJsCode.substring(idx, idx + 1500);
  console.log('\nSnippet from app.js:\n' + snippet.substring(0, 400) + '...\n');
}

console.log('🎉 VERIFICATION SUCCESSFUL!');
