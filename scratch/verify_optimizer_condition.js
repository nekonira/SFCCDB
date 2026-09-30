const fs = require('fs');
const path = require('path');

console.log('=== Verifying Optimizer Condition Multiplier Integration ===');

const appJsxPath = path.join(__dirname, '..', 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

if (!code.includes("conditionMultiplier = 1.0")) {
  console.error('❌ conditionMultiplier parameter missing from optimizeSpecialCardSlots options');
  process.exit(1);
}
console.log('✅ conditionMultiplier parameter included in optimizeSpecialCardSlots options');

if (!code.includes("boostMap[stName] = val * bonusMult * conditionMultiplier;")) {
  console.log('❌ boostMap calculation missing conditionMultiplier');
  process.exit(1);
}
console.log('✅ boostMap calculation incorporates conditionMultiplier (val * bonusMult * conditionMultiplier)');

if (!code.includes("optimizationStrategy: strategy,\n      conditionMultiplier")) {
  console.error('❌ handleDirectAutoSelect missing conditionMultiplier');
  process.exit(1);
}
console.log('✅ Quick preset button handler (handleDirectAutoSelect) passes active conditionMultiplier');

if (!code.includes("conditionMultiplier={conditionMultiplier}")) {
  console.error('❌ AutoSelectModal missing conditionMultiplier prop');
  process.exit(1);
}
console.log('✅ AutoSelectModal receives conditionMultiplier prop');

console.log('\n🎉 ALL OPTIMIZER CONDITION VERIFICATION TESTS PASSED!');
