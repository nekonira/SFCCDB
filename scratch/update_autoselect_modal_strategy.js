const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// Update AutoSelectModal props & state to accept initialStrategy
const modalHeaderTarget = `function AutoSelectModal({ isOpen, onClose, onApply, currentPlayer, officialCards, calculateBoostedPlayer }) {
  if (!isOpen || !currentPlayer) return null;

  const [targetGoal, setTargetGoal] = useState('TOTAL');`;

const modalHeaderReplacement = `function AutoSelectModal({ isOpen, onClose, onApply, currentPlayer, officialCards, calculateBoostedPlayer, initialStrategy = 'EFFECTIVE_MAX' }) {
  if (!isOpen || !currentPlayer) return null;

  const [targetGoal, setTargetGoal] = useState('TOTAL');
  const [optimizationStrategy, setOptimizationStrategy] = useState(initialStrategy || 'EFFECTIVE_MAX');`;

if (content.includes(modalHeaderTarget)) {
  content = content.replace(modalHeaderTarget, modalHeaderReplacement);
  console.log('Updated AutoSelectModal header with initialStrategy');
} else {
  console.error('modalHeaderTarget not found');
}

// Update optimizeSpecialCardSlots call inside AutoSelectModal
const optCallTarget = `matchPlaystyleBonusOnly,
      allowDuplicates
    });`;

const optCallReplacement = `matchPlaystyleBonusOnly,
      allowDuplicates,
      optimizationStrategy
    });`;

if (content.includes(optCallTarget)) {
  content = content.replace(optCallTarget, optCallReplacement);
  console.log('Updated optimizeSpecialCardSlots call with optimizationStrategy');
} else {
  console.error('optCallTarget not found');
}

// Insert strategy selection buttons in Modal Body
const formBodyTarget = `{/* 条件設定エリア */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">`;

const formBodyReplacement = `{/* 条件設定エリア */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
            {/* モード・戦略選択 */}
            <div className="md:col-span-2 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <label className="block text-xs font-black text-amber-400 flex items-center gap-1">
                <Icon name="sliders" className="w-3.5 h-3.5" />
                最適化アルゴリズム方針
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOptimizationStrategy('EFFECTIVE_MAX')}
                  className={\`p-2.5 rounded-xl border text-xs font-black transition-all flex flex-col gap-0.5 text-left cursor-pointer \${
                    optimizationStrategy === 'EFFECTIVE_MAX'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }\`}
                >
                  <span className="text-white flex items-center gap-1">
                    🔥 有効上昇量 最大化 (限界値溢れ無効化)
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    成長限界値を超える溢れ分（カンストオーバー）を無駄とみなして有効上昇値を最大化
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setOptimizationStrategy('SAFE_150')}
                  className={\`p-2.5 rounded-xl border text-xs font-black transition-all flex flex-col gap-0.5 text-left cursor-pointer \${
                    optimizationStrategy === 'SAFE_150'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }\`}
                >
                  <span className="text-white flex items-center gap-1">
                    🛡️ 無難最適編成 (限界値-150以下安全枠)
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    全18能力が限界値より-150以下にギリギリ収まる安全範囲内で能力上昇を最大化
                  </span>
                </button>
              </div>
            </div>`;

if (content.includes(formBodyTarget)) {
  content = content.replace(formBodyTarget, formBodyReplacement);
  console.log('Inserted strategy selection buttons into AutoSelectModal');
} else {
  console.error('formBodyTarget not found');
}

fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Successfully updated AutoSelectModal strategy UI in src/app.jsx');
