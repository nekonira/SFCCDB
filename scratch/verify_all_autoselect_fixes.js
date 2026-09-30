const fs = require('fs');
const path = require('path');

const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');

console.log('=== Final Verification of Auto-Select & Condition-Specified Features ===');

const checks = [
  { name: 'conditionMultiplier in AutoSelectModal props', str: 'conditionMultiplier=1.0' },
  { name: 'conditionMultiplier in optimizeSpecialCardSlots options inside AutoSelectModal', str: 'ownedCards,conditionMultiplier' },
  { name: 'onApply toast message in AutoSelectModal', str: '条件指定による最適化編成' },
  { name: 'setSubTab("slots") on apply', str: 'setSubTab("slots")' },
  { name: 'Header Quick AutoSelect buttons', str: '全能力が限界値の -155〜-135 範囲に収まる最適編成を適用' }
];

let allPassed = true;
checks.forEach(c => {
  if (appJsCode.includes(c.str)) {
    console.log(`✅ Passed: ${c.name}`);
  } else {
    console.log(`❌ Failed: ${c.name}`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n🎉 ALL CHECKS PASSED PERFECTLY!');
} else {
  console.log('\n⚠️ Some checks failed.');
}
