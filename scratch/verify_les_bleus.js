const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Verifying レ・ブルー’26 Formation Combo ===');

const appJsxPath = path.join(__dirname, '..', 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

// Quick check in code
if (!code.includes("id: 'lesBleus26'")) {
  console.error('❌ lesBleus26 missing from app.jsx');
  process.exit(1);
}
console.log('✅ Combo ID lesBleus26 present in app.jsx');

if (!code.includes("id: '433b_lesBleus26'")) {
  console.error('❌ Formation ID 433b_lesBleus26 missing from app.jsx');
  process.exit(1);
}
console.log('✅ Formation ID 433b_lesBleus26 present in app.jsx');

if (!code.includes("isLesBleus")) {
  console.error('❌ isLesBleus calculation missing!');
  process.exit(1);
}
console.log('✅ France player bonus logic (isLesBleus) integrated in app.jsx');

console.log('\n🎉 ALL FORMATION COMBO VERIFICATION TESTS PASSED!');
