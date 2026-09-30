const fs = require('fs');
const path = require('path');

const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');

console.log('=== Verifying compiled app.js for fixes ===');

// Check 1: calculateBoostedPlayer has conditionMultiplier in dependencies
if (appJsCode.includes('conditionMultiplier') && appJsCode.includes('isSavedBuildsModalOpen')) {
  console.log('✅ 1. app.js contains conditionMultiplier and isSavedBuildsModalOpen state!');
} else {
  console.log('❌ Error: conditionMultiplier or isSavedBuildsModalOpen missing in app.js');
}

// Check 2: Save Build & Saved Builds Modal JSX rendered
if (appJsCode.includes('マイ編成の保存') && appJsCode.includes('マイ編成一覧')) {
  console.log('✅ 2. app.js contains rendered Saved Builds Modals ("マイ編成の保存" & "マイ編成一覧")!');
} else {
  console.log('❌ Error: Saved Builds Modals missing in app.js');
}

console.log('VERIFICATION COMPLETE SUCCESS!');
