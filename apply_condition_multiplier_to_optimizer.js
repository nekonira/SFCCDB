const fs = require('fs');
const path = require('path');

console.log('=== Updating optimizeSpecialCardSlots and AutoSelectModal with Condition Multiplier ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// 1. Update optimizeSpecialCardSlots parameter destructuring
if (!jsxCode.includes("conditionMultiplier = 1.0")) {
  jsxCode = jsxCode.replace(
    "useOwnedCardsOnly = false,\n    ownedCards = {}\n  } = options;",
    "useOwnedCardsOnly = false,\n    ownedCards = {},\n    conditionMultiplier = 1.0\n  } = options;"
  );

  // 2. Update cardBoostMaps calculation in optimizeSpecialCardSlots
  jsxCode = jsxCode.replace(
    "boostMap[stName] = val * bonusMult;",
    "boostMap[stName] = val * bonusMult * conditionMultiplier;"
  );
  console.log('✅ 1. Updated optimizeSpecialCardSlots to apply conditionMultiplier to boostMap');
}

// 3. Update handleDirectAutoSelect in TrainingSimulatorTab
if (!jsxCode.includes("optimizationStrategy: strategy,\n      conditionMultiplier")) {
  jsxCode = jsxCode.replace(
    "optimizationStrategy: strategy\n    });",
    "optimizationStrategy: strategy,\n      conditionMultiplier\n    });"
  );
  console.log('✅ 2. Updated handleDirectAutoSelect to pass conditionMultiplier');
}

// 4. Update AutoSelectModal call & props in TrainingSimulatorTab
if (!jsxCode.includes("conditionMultiplier={conditionMultiplier}")) {
  jsxCode = jsxCode.replace(
    "calculateBoostedPlayer={calculateBoostedPlayer}\n          initialStrategy={autoSelectInitialMode}",
    "calculateBoostedPlayer={calculateBoostedPlayer}\n          conditionMultiplier={conditionMultiplier}\n          simPlayerCondition={simPlayerCondition}\n          initialStrategy={autoSelectInitialMode}"
  );
  console.log('✅ 3. Passed conditionMultiplier and simPlayerCondition to AutoSelectModal props');
}

// 5. Update AutoSelectModal signature & optimizeSpecialCardSlots call inside AutoSelectModal
if (!jsxCode.includes("conditionMultiplier = 1.0") && jsxCode.includes("function AutoSelectModal(")) {
  jsxCode = jsxCode.replace(
    "function AutoSelectModal({ isOpen, onClose, onApply, currentPlayer, officialCards, calculateBoostedPlayer, initialStrategy",
    "function AutoSelectModal({ isOpen, onClose, onApply, currentPlayer, officialCards, calculateBoostedPlayer, conditionMultiplier = 1.0, simPlayerCondition = '普通', initialStrategy"
  );

  jsxCode = jsxCode.replace(
    "useOwnedCardsOnly,\n      ownedCards\n    });\n  }, [currentPlayer, officialCards, targetGoal, targetStage, selectedAbilities, selectedSkills, matchPlaystyleBonusOnly, allowDuplicates, optimizationStrategy, useOwnedCardsOnly, ownedCards]);",
    "useOwnedCardsOnly,\n      ownedCards,\n      conditionMultiplier\n    });\n  }, [currentPlayer, officialCards, targetGoal, targetStage, selectedAbilities, selectedSkills, matchPlaystyleBonusOnly, allowDuplicates, optimizationStrategy, useOwnedCardsOnly, ownedCards, conditionMultiplier]);"
  );
  console.log('✅ 4. Updated AutoSelectModal signature & useMemo dependency array with conditionMultiplier');
}

// 6. Update AutoSelectModal Header to display active Condition Badge
if (!jsxCode.includes("simPlayerCondition !== '普通'")) {
  jsxCode = jsxCode.replace(
    `({currentPlayer.mainPosition} / {currentPlayer.playStyle || 'プレイスタイル未設定'})`,
    `({currentPlayer.mainPosition} / {currentPlayer.playStyle || 'プレイスタイル未設定'}) {simPlayerCondition !== '普通' && <span className="ml-2 px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px]">⚡ 調子: {simPlayerCondition} ({conditionMultiplier}倍)</span>}`
  );
  console.log('✅ 5. Added condition badge display in AutoSelectModal header');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
console.log('🎉 APP.JSX OPTIMIZER CALCULATION UPDATED SUCCESSFULLY!');
