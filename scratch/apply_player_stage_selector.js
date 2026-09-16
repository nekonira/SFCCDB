const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// 1. Add simPlayerRarity state & handleSimPlayerRarityChange callback in App()
const stateTarget = `const [isAutoSelectModalOpen, setIsAutoSelectModalOpen] = useState(false);`;
const stateReplacement = `const [isAutoSelectModalOpen, setIsAutoSelectModalOpen] = useState(false);
  const [simPlayerRarity, setSimPlayerRarity] = useState('☆5');
  const [simPlayerMaxEnhanced, setSimPlayerMaxEnhanced] = useState(true);

  const handleSimPlayerRarityChange = useCallback((targetRarity, isMax = false) => {
    setSimPlayerRarity(targetRarity);
    setSimPlayerMaxEnhanced(isMax);
    setCurrentPlayer(prev => {
      if (!prev) return prev;
      const raw = prev.rawPlayer || prev;
      return getAdjustedPlayer(raw, targetRarity, isMax);
    });
  }, []);`;

if (content.includes(stateTarget)) {
  content = content.replace(stateTarget, stateReplacement);
  console.log('Added simPlayerRarity state and handleSimPlayerRarityChange');
} else {
  console.error('stateTarget not found');
}

// 2. Update player modal selection to apply adjusted player stats
const selectPlayerTarget = `onClick={() => {
                                  setCurrentPlayer(p);
                                  setIsPlayerModalOpen(false);
                                }}`;

const selectPlayerReplacement = `onClick={() => {
                                  const adjusted = getAdjustedPlayer(p, simPlayerRarity, simPlayerMaxEnhanced);
                                  setCurrentPlayer(adjusted);
                                  setIsPlayerModalOpen(false);
                                }}`;

if (content.includes(selectPlayerTarget)) {
  content = content.replace(selectPlayerTarget, selectPlayerReplacement);
  console.log('Updated player modal selection to use getAdjustedPlayer');
} else {
  console.log('selectPlayerTarget not found, checking alternatives...');
}

// 3. Update player selection header (lines 8380-8388)
const headerTarget = `<div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setIsPlayerModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Icon name="search" className="w-4 h-4 text-slate-950" />
              🔄 選手変更 (ポップアップ)
            </button>
          </div>`;

const headerReplacement = `<div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap justify-end">
            {/* 選手自身の凸数・強化ランク選択 */}
            <div className="flex items-center gap-1.5 bg-slate-950/90 p-1.5 rounded-xl border border-slate-800 shadow-inner">
              <span className="text-[11px] font-black text-amber-400 px-1 flex items-center gap-1 whitespace-nowrap">
                <Icon name="award" className="w-3.5 h-3.5 text-amber-400" />
                選手ランク(凸数):
              </span>
              <select
                value={simPlayerMaxEnhanced ? 'MAX' : simPlayerRarity}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'MAX') {
                    handleSimPlayerRarityChange('☆5', true);
                  } else {
                    handleSimPlayerRarityChange(val, false);
                  }
                }}
                className="bg-slate-900 text-white text-xs font-black px-2.5 py-1.5 rounded-lg border border-slate-700 focus:border-amber-400 outline-none cursor-pointer"
              >
                <option value="☆3">☆3 (無凸 / 初期)</option>
                <option value="☆3+">☆3+ (1凸)</option>
                <option value="☆3++">☆3++ (2凸)</option>
                <option value="☆4">☆4 (3凸)</option>
                <option value="☆4+">☆4+ (4凸)</option>
                <option value="☆4++">☆4++ (5凸)</option>
                <option value="☆5">☆5 (6凸 / 覚醒)</option>
                <option value="MAX">🔥 ☆5 (最大強化)</option>
              </select>
            </div>

            <button
              onClick={() => setIsPlayerModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Icon name="search" className="w-4 h-4 text-slate-950" />
              🔄 選手変更 (ポップアップ)
            </button>
          </div>`;

if (content.includes(headerTarget)) {
  content = content.replace(headerTarget, headerReplacement);
  console.log('Updated Sub-Tab 1 header with player rank selector!');
} else {
  console.error('headerTarget not found');
}

fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Successfully written player stage selector updates to src/app.jsx');
