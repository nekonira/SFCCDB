const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, '..', 'src', 'app.jsx');
let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

console.log('=== Applying AutoSelectModal & Target Condition Fixes ===');

// 1. Update AutoSelectModal signature to destructure conditionMultiplier and simPlayerCondition
const oldModalSig = `function AutoSelectModal({ isOpen, onClose, onApply, currentPlayer, officialCards, calculateBoostedPlayer, initialStrategy = 'EFFECTIVE_MAX', setAutoSelectToast, ownedCards, saveOwnedCards })`;
const newModalSig = `function AutoSelectModal({ isOpen, onClose, onApply, currentPlayer, officialCards, calculateBoostedPlayer, conditionMultiplier = 1.0, simPlayerCondition = '普通', initialStrategy = 'EFFECTIVE_MAX', setAutoSelectToast, ownedCards, saveOwnedCards })`;

if (jsxCode.includes(oldModalSig)) {
  jsxCode = jsxCode.replace(oldModalSig, newModalSig);
  console.log('✅ 1. Updated AutoSelectModal signature to destructure conditionMultiplier & simPlayerCondition');
}

// 2. Update optimizeSpecialCardSlots call inside AutoSelectModal
const oldModalOpt = `  const optimizedSlots = useMemo(() => {
    return optimizeSpecialCardSlots(currentPlayer, officialCards, {
      targetGoal,
      targetStage,
      requiredAbilities: selectedAbilities,
      requiredSkills: selectedSkills,
      matchPlaystyleBonusOnly,
      allowDuplicates,
      optimizationStrategy,
      useOwnedCardsOnly,
      ownedCards
    });
  }, [currentPlayer, officialCards, targetGoal, targetStage, selectedAbilities, selectedSkills, matchPlaystyleBonusOnly, allowDuplicates, optimizationStrategy, useOwnedCardsOnly, ownedCards]);`;

const newModalOpt = `  const optimizedSlots = useMemo(() => {
    return optimizeSpecialCardSlots(currentPlayer, officialCards, {
      targetGoal,
      targetStage,
      requiredAbilities: selectedAbilities,
      requiredSkills: selectedSkills,
      matchPlaystyleBonusOnly,
      allowDuplicates,
      optimizationStrategy,
      useOwnedCardsOnly,
      ownedCards,
      conditionMultiplier
    });
  }, [currentPlayer, officialCards, targetGoal, targetStage, selectedAbilities, selectedSkills, matchPlaystyleBonusOnly, allowDuplicates, optimizationStrategy, useOwnedCardsOnly, ownedCards, conditionMultiplier]);`;

if (jsxCode.includes(oldModalOpt)) {
  jsxCode = jsxCode.replace(oldModalOpt, newModalOpt);
  console.log('✅ 2. Added conditionMultiplier to optimizeSpecialCardSlots & useMemo in AutoSelectModal');
}

// 3. Update Apply button in AutoSelectModal to pass toast message
const oldApplyBtn = `          <button
            onClick={() => {
              onApply(optimizedSlots);
              onClose();
            }}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
          >
            ⚡ この6枚をスロットに適用する
          </button>`;

const newApplyBtn = `          <button
            onClick={() => {
              const msg = \`⚡ 条件指定による最適化編成（\${optimizationStrategy === 'SAFE_150' ? '無難最適' : '最大数値'}）をスロットに適用しました！\`;
              onApply(optimizedSlots, msg);
              onClose();
            }}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
          >
            ⚡ この6枚をスロットに適用する
          </button>`;

if (jsxCode.includes(oldApplyBtn)) {
  jsxCode = jsxCode.replace(oldApplyBtn, newApplyBtn);
  console.log('✅ 3. Updated Apply button in AutoSelectModal to pass toast message');
}

// 4. Update onApply handler in TrainingSimulatorTab to switch subTab to 'slots'
const oldOnApply = `          onApply={(newSlots, toastMsg) => {
            setSlots(newSlots);
            if (toastMsg) {
              setAutoSelectToast(toastMsg);
              setTimeout(() => setAutoSelectToast(null), 3500);
            }
          }}`;

const newOnApply = `          onApply={(newSlots, toastMsg) => {
            setSlots(newSlots);
            setSubTab('slots');
            if (toastMsg) {
              setAutoSelectToast(toastMsg);
              setTimeout(() => setAutoSelectToast(null), 3500);
            }
          }}`;

if (jsxCode.includes(oldOnApply)) {
  jsxCode = jsxCode.replace(oldOnApply, newOnApply);
  console.log('✅ 4. Updated onApply in TrainingSimulatorTab to set subTab to slots');
}

// 5. Update handleDirectAutoSelect to switch subTab to 'slots'
const oldDirectSelect = `    setSlots(newSlots);
    if (strategy === 'SAFE_150' || strategy === 'SAFE_RANGE') {`;

const newDirectSelect = `    setSlots(newSlots);
    setSubTab('slots');
    if (strategy === 'SAFE_150' || strategy === 'SAFE_RANGE') {`;

if (jsxCode.includes(oldDirectSelect)) {
  jsxCode = jsxCode.replace(oldDirectSelect, newDirectSelect);
  console.log('✅ 5. Updated handleDirectAutoSelect to set subTab to slots');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
console.log('🎉 APP.JSX FIXES APPLIED SUCCESSFULLY!');
