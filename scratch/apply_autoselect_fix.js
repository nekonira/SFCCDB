const fs = require('fs');

let appJsx = fs.readFileSync('c:/Users/nekon/SFCCdeta/src/app.jsx', 'utf8');

// 1. Add autoSelectToast state & handleDirectAutoSelect to App
const targetState = `  const [isAutoSelectModalOpen, setIsAutoSelectModalOpen] = useState(false);
  const [autoSelectInitialMode, setAutoSelectInitialMode] = useState('EFFECTIVE_MAX');`;

const newState = `  const [isAutoSelectModalOpen, setIsAutoSelectModalOpen] = useState(false);
  const [autoSelectInitialMode, setAutoSelectInitialMode] = useState('EFFECTIVE_MAX');
  const [autoSelectToast, setAutoSelectToast] = useState(null);

  const handleDirectAutoSelect = (strategy) => {
    if (!currentPlayer) return;
    const newSlots = optimizeSpecialCardSlots(currentPlayer, officialCards, {
      targetGoal: 'TOTAL',
      targetStage: '完凸',
      requiredAbilities: [],
      requiredSkills: [],
      matchPlaystyleBonusOnly: false,
      allowDuplicates: true,
      optimizationStrategy: strategy
    });
    setSlots(newSlots);
    if (strategy === 'SAFE_150') {
      setAutoSelectToast('🛡️ 全18能力が限界値-150以下に収まる【無難最適編成】を直接適用しました！');
    } else {
      setAutoSelectToast('⚡ 有効上昇量を最大化する【自動最適編成】を直接適用しました！');
    }
    setTimeout(() => setAutoSelectToast(null), 3500);
  };`;

if (appJsx.includes(targetState)) {
  appJsx = appJsx.replace(targetState, newState);
  console.log('Successfully added handleDirectAutoSelect and toast state.');
} else {
  console.error('Target state not found!');
}

// 2. Replace Quick Preset Bar in Sub-Tab 1
const targetBar = `<div className="glass-panel p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1">
                <Icon name="sparkles" className="w-3.5 h-3.5" />
                クイック一括操作:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button onClick={() => { setAutoSelectInitialMode('EFFECTIVE_MAX'); setIsAutoSelectModalOpen(true); }} className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow cursor-pointer flex items-center gap-1">⚡ 自動最適編成</button>
                <button onClick={() => { setAutoSelectInitialMode('SAFE_150'); setIsAutoSelectModalOpen(true); }} className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-black text-xs shadow cursor-pointer flex items-center gap-1">🛡️ 無難最適編成 (限界値-150以下)</button>
                <button onClick={() => applyPreset('ALL_MAX')} className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow cursor-pointer">🔥 6枠 完凸全セット</button>
                <button onClick={() => applyPreset('RESET')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 font-bold text-xs cursor-pointer">✕ リセット</button>
              </div>
            </div>`;

const newBar = `<div className="glass-panel p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1">
                  <Icon name="sparkles" className="w-3.5 h-3.5" />
                  自動最適編成 ＆ プリセット:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleDirectAutoSelect('EFFECTIVE_MAX')}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-md cursor-pointer flex items-center gap-1 transition-all active:scale-95"
                  >
                    ⚡ 自動最適編成
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDirectAutoSelect('SAFE_150')}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-black text-xs shadow-md cursor-pointer flex items-center gap-1 transition-all active:scale-95"
                  >
                    🛡️ 無難最適編成 (限界値-150以下)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAutoSelectInitialMode('EFFECTIVE_MAX'); setIsAutoSelectModalOpen(true); }}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-amber-500/40 text-amber-300 font-extrabold text-xs cursor-pointer flex items-center gap-1 transition-all"
                  >
                    ⚙️ 条件指定編成...
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('ALL_MAX')}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                  >
                    🔥 6枠 完凸全セット
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('RESET')}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 font-bold text-xs cursor-pointer"
                  >
                    ✕ リセット
                  </button>
                </div>
              </div>

              {autoSelectToast && (
                <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-amber-500/50 p-2.5 rounded-xl shadow-xl flex items-center justify-between animate-fadeIn text-xs font-black text-amber-300">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">✨</span>
                    <span>{autoSelectToast}</span>
                  </div>
                  <button type="button" onClick={() => setAutoSelectToast(null)} className="text-slate-400 hover:text-white font-bold ml-4 cursor-pointer">✕</button>
                </div>
              )}
            </div>`;

if (appJsx.includes(targetBar)) {
  appJsx = appJsx.replace(targetBar, newBar);
  console.log('Successfully replaced Quick Preset Bar in Sub-Tab 1.');
} else {
  console.error('Target bar not found!');
}

// 3. Pass setAutoSelectToast to AutoSelectModal
const modalInvocation = `<AutoSelectModal
        isOpen={isAutoSelectModalOpen}
        onClose={() => setIsAutoSelectModalOpen(false)}
        onApply={(newSlots) => setSlots(newSlots)}
        currentPlayer={currentPlayer}
        officialCards={officialCards}
        calculateBoostedPlayer={calculateBoostedPlayer}
        initialStrategy={autoSelectInitialMode}
      />`;

const newModalInvocation = `<AutoSelectModal
        isOpen={isAutoSelectModalOpen}
        onClose={() => setIsAutoSelectModalOpen(false)}
        onApply={(newSlots) => setSlots(newSlots)}
        currentPlayer={currentPlayer}
        officialCards={officialCards}
        calculateBoostedPlayer={calculateBoostedPlayer}
        initialStrategy={autoSelectInitialMode}
        setAutoSelectToast={setAutoSelectToast}
      />`;

if (appJsx.includes(modalInvocation)) {
  appJsx = appJsx.replace(modalInvocation, newModalInvocation);
  console.log('Successfully updated AutoSelectModal invocation.');
} else {
  console.error('Modal invocation not found!');
}

// 4. Update AutoSelectModal implementation
const targetModalDef = `function AutoSelectModal({ isOpen, onClose, onApply, currentPlayer, officialCards, calculateBoostedPlayer, initialStrategy = 'EFFECTIVE_MAX' }) {
  if (!isOpen || !currentPlayer) return null;

  const [targetGoal, setTargetGoal] = useState('TOTAL');
  const [optimizationStrategy, setOptimizationStrategy] = useState(initialStrategy || 'EFFECTIVE_MAX');`;

const newModalDef = `function AutoSelectModal({ isOpen, onClose, onApply, currentPlayer, officialCards, calculateBoostedPlayer, initialStrategy = 'EFFECTIVE_MAX', setAutoSelectToast }) {
  if (!isOpen || !currentPlayer) return null;

  const [targetGoal, setTargetGoal] = useState('TOTAL');
  const [optimizationStrategy, setOptimizationStrategy] = useState(initialStrategy || 'EFFECTIVE_MAX');

  useEffect(() => {
    if (isOpen) {
      setOptimizationStrategy(initialStrategy || 'EFFECTIVE_MAX');
    }
  }, [isOpen, initialStrategy]);`;

if (appJsx.includes(targetModalDef)) {
  appJsx = appJsx.replace(targetModalDef, newModalDef);
  console.log('Successfully updated AutoSelectModal signature and useEffect.');
} else {
  console.error('Target modal definition not found!');
}

// 5. Update useMemo dependency array in AutoSelectModal
const targetUseMemo = `  const optimizedSlots = useMemo(() => {
    return optimizeSpecialCardSlots(currentPlayer, officialCards, {
      targetGoal,
      targetStage,
      requiredAbilities: selectedAbilities,
      requiredSkills: selectedSkills,
      matchPlaystyleBonusOnly,
      allowDuplicates,
      optimizationStrategy
    });
  }, [currentPlayer, officialCards, targetGoal, targetStage, selectedAbilities, selectedSkills, matchPlaystyleBonusOnly]);`;

const newUseMemo = `  const optimizedSlots = useMemo(() => {
    return optimizeSpecialCardSlots(currentPlayer, officialCards, {
      targetGoal,
      targetStage,
      requiredAbilities: selectedAbilities,
      requiredSkills: selectedSkills,
      matchPlaystyleBonusOnly,
      allowDuplicates,
      optimizationStrategy
    });
  }, [currentPlayer, officialCards, targetGoal, targetStage, selectedAbilities, selectedSkills, matchPlaystyleBonusOnly, allowDuplicates, optimizationStrategy]);`;

if (appJsx.includes(targetUseMemo)) {
  appJsx = appJsx.replace(targetUseMemo, newUseMemo);
  console.log('Successfully updated optimizedSlots useMemo dependency array.');
} else {
  console.error('Target useMemo not found!');
}

// 6. Update pool size in optimizeSpecialCardSlots
const targetPool = `  const pool = [...candidates].sort((a, b) => evaluateSetScore([b]) - evaluateSetScore([a])).slice(0, 20);`;
const newPool = `  const pool = [...candidates].sort((a, b) => evaluateSetScore([b]) - evaluateSetScore([a])).slice(0, 14);`;

if (appJsx.includes(targetPool)) {
  appJsx = appJsx.replace(targetPool, newPool);
  console.log('Successfully updated pool size.');
} else {
  console.error('Target pool not found!');
}

// 7. Update fillSlots recursive loop
const targetFillLoop = `    for (let i = 0; i < Math.min(8, available.length); i++) {
      fillSlots([...currentSet, available[i]]);
    }`;

const newFillLoop = `    for (let i = 0; i < Math.min(6, available.length); i++) {
      fillSlots([...currentSet, available[i]]);
    }`;

if (appJsx.includes(targetFillLoop)) {
  appJsx = appJsx.replace(targetFillLoop, newFillLoop);
  console.log('Successfully updated fillSlots loop limit.');
} else {
  console.error('Target fill loop not found!');
}

// Write app.jsx
fs.writeFileSync('c:/Users/nekon/SFCCdeta/src/app.jsx', appJsx, 'utf8');
console.log('Wrote updated app.jsx!');
