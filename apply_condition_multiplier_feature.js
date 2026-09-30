const fs = require('fs');
const path = require('path');

console.log('=== Adding Player Condition Multiplier to Special Cards Simulator ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// 1. Add simPlayerCondition State
if (!jsxCode.includes("const [simPlayerCondition, setSimPlayerCondition] = useState('普通');")) {
  jsxCode = jsxCode.replace(
    "const [simPlayerMaxEnhanced, setSimPlayerMaxEnhanced] = useState(false);",
    "const [simPlayerMaxEnhanced, setSimPlayerMaxEnhanced] = useState(false);\n  const [simPlayerCondition, setSimPlayerCondition] = useState('普通');"
  );
  console.log('✅ 1. Added simPlayerCondition state in TrainingSimulatorTab');
}

// 2. Add CONDITION_MULTIPLIERS and apply to calculateBoostedPlayer
if (!jsxCode.includes("const CONDITION_MULTIPLIERS = {")) {
  jsxCode = jsxCode.replace(
    "  const calculateBoostedPlayer = useCallback((p, currentSlots) => {",
    `  const CONDITION_MULTIPLIERS = { '普通': 1.0, '好調': 1.25, '絶好調': 1.5 };
  const conditionMultiplier = CONDITION_MULTIPLIERS[simPlayerCondition] || 1.0;

  const calculateBoostedPlayer = useCallback((p, currentSlots) => {`
  );

  jsxCode = jsxCode.replace(
    "const bonusMultiplier = calculateCardBonusMult(p, card);",
    "const bonusMultiplier = calculateCardBonusMult(p, card);\n      const effectiveCardMult = bonusMultiplier * conditionMultiplier;"
  );

  jsxCode = jsxCode.replace(
    "const boostedVal = floor1Decimal(val * bonusMultiplier);",
    "const boostedVal = floor1Decimal(val * effectiveCardMult);"
  );

  jsxCode = jsxCode.replace(
    "  }, [officialCards]);",
    "  }, [officialCards, conditionMultiplier]);"
  );
  console.log('✅ 2. Applied conditionMultiplier logic to calculateBoostedPlayer');
}

// 3. Add Condition Dropdown in Player Selection Bar
const raritySelectTarget = `              <select
                value={simPlayerRarity}
                onChange={(e) => handleSimPlayerRarityChange(e.target.value, false)}
                className="bg-slate-900 text-white text-xs font-black px-2.5 py-1.5 rounded-lg border border-slate-700 focus:border-amber-400 outline-none cursor-pointer"
              >
                <option value="☆3">☆3</option>
                <option value="☆3+">☆3+</option>
                <option value="☆3++">☆3++</option>
                <option value="☆4">☆4</option>
                <option value="☆4+">☆4+</option>
                <option value="☆4++">☆4++</option>
                <option value="☆5">☆5</option>
              </select>
            </div>`;

const conditionDropdownJsx = `              <select
                value={simPlayerRarity}
                onChange={(e) => handleSimPlayerRarityChange(e.target.value, false)}
                className="bg-slate-900 text-white text-xs font-black px-2.5 py-1.5 rounded-lg border border-slate-700 focus:border-amber-400 outline-none cursor-pointer"
              >
                <option value="☆3">☆3</option>
                <option value="☆3+">☆3+</option>
                <option value="☆3++">☆3++</option>
                <option value="☆4">☆4</option>
                <option value="☆4+">☆4+</option>
                <option value="☆4++">☆4++</option>
                <option value="☆5">☆5</option>
              </select>
            </div>

            {/* 選手自身の調子選択 (普通:1.0x / 好調:1.25x / 絶好調:1.5x) */}
            <div className="flex items-center gap-1.5 bg-slate-950/90 p-1.5 rounded-xl border border-slate-800 shadow-inner">
              <span className="text-[11px] font-black text-amber-400 px-1 flex items-center gap-1 whitespace-nowrap">
                <Icon name="zap" className="w-3.5 h-3.5 text-amber-400" />
                調子:
              </span>
              <select
                value={simPlayerCondition}
                onChange={(e) => setSimPlayerCondition(e.target.value)}
                className="bg-slate-900 text-white text-xs font-black px-2.5 py-1.5 rounded-lg border border-slate-700 focus:border-amber-400 outline-none cursor-pointer"
              >
                <option value="普通">普通 (1.0倍)</option>
                <option value="好調">好調 (1.25倍)</option>
                <option value="絶好調">絶好調 (1.5倍)</option>
              </select>
            </div>`;

if (!jsxCode.includes("value={simPlayerCondition}")) {
  jsxCode = jsxCode.replace(raritySelectTarget, conditionDropdownJsx);
  console.log('✅ 3. Added 調子 dropdown right next to 選手ランク in player selection bar');
}

// 4. Add Condition Badge in Total Capacity Header
const meterHeaderTarget = `<span className="text-xs text-slate-400 font-bold">
                    有効スロット: {slots.filter(s => s.active).length} / 6
                  </span>`;

const meterHeaderReplacement = `<div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold">
                      有効スロット: {slots.filter(s => s.active).length} / 6
                    </span>
                    {simPlayerCondition !== '普通' && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-black text-[10px] flex items-center gap-1 shadow">
                        <Icon name="zap" className="w-3 h-3 text-amber-400" />
                        調子: {simPlayerCondition} ({CONDITION_MULTIPLIERS[simPlayerCondition]}倍)
                      </span>
                    )}
                  </div>`;

if (jsxCode.includes(meterHeaderTarget)) {
  jsxCode = jsxCode.replace(meterHeaderTarget, meterHeaderReplacement);
  console.log('✅ 4. Added 調子 badge indicator in meter header section');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
console.log('🎉 APP.JSX UPDATED SUCCESSFULLY WITH CONDITION MULTIPLIER!');
