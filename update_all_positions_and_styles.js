const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const mockDataPath = path.join(__dirname, 'src', 'data', 'mockData.js');

const newPositions = ['GK', 'CB', 'LFB', 'RFB', 'DM', 'LM', 'RM', 'AM', 'LW', 'RW', 'CF'];
const newPlayStyleLevels = ['Ⅰ', 'Ⅱ', 'Ⅲ'];
const newPlayStyles = [
  'オーソドックスGK', 'スイーパーGK', 'ストッパー', '組立CB', 'スプリントCB',
  '守備的LFB', '守備的RFB', '攻撃的LFB', '攻撃的RFB', 'ハードマーカー',
  'セントラルDM', 'パサーDM', 'ドリブラーLM', 'サイドアタッカーLM', 'ドリブラーRM',
  'サイドアタッカーRM', 'セントラルAM', 'パサーAM', 'アタッカー', 'ドリブラーLW',
  'サイドアタッカーLW', 'ワイドストライカーLW', 'ドリブラーRW', 'サイドアタッカーRW',
  'ワイドストライカーRW', 'ポストプレーヤー', 'ラインブレーカー', 'ストライカー'
];

console.log('--- Updating POSITIONS, PLAY_STYLES & PLAY_STYLE_LEVELS ---');

// 1. Update src/app.jsx
let appJsx = fs.readFileSync(appJsxPath, 'utf-8');

appJsx = appJsx.replace(
  /const POSITIONS = \[.*?\];/s,
  `const POSITIONS = ${JSON.stringify(newPositions)};`
);

appJsx = appJsx.replace(
  /const PLAY_STYLE_LEVELS = \[.*?\];/s,
  `const PLAY_STYLE_LEVELS = ${JSON.stringify(newPlayStyleLevels)};`
);

appJsx = appJsx.replace(
  /const PLAY_STYLES = \[.*?\];/s,
  `const PLAY_STYLES = ${JSON.stringify(newPlayStyles, null, 2)};`
);

// Update POS_ORDER in src/app.jsx
const newPosOrder = `const POS_ORDER = {
      'GK': 1,
      'CB': 2,
      'LFB': 3, 'LSB': 3,
      'RFB': 4, 'RSB': 4,
      'DM': 5, 'DMF': 5, 'CMF': 5,
      'LM': 6, 'LMF': 6,
      'RM': 7, 'RMF': 7,
      'AM': 8, 'OMF': 8,
      'LW': 9, 'LWG': 9,
      'RW': 10, 'RWG': 10,
      'CF': 11, 'ST': 11
    };`;

appJsx = appJsx.replace(/const POS_ORDER = \{[\s\S]*?\};/, newPosOrder);

// Update flexible position filter logic in src/app.jsx
const flexPosLogic = `          if (pos === posFilter) return true;
          if ((posFilter === 'DM') && (pos === 'DM' || pos === 'DMF' || pos === 'CMF')) return true;
          if ((posFilter === 'AM') && (pos === 'AM' || pos === 'OMF')) return true;
          if ((posFilter === 'LM') && (pos === 'LM' || pos === 'LMF' || (pos === 'SMF' && p.category === 'MF'))) return true;
          if ((posFilter === 'RM') && (pos === 'RM' || pos === 'RMF' || (pos === 'SMF' && p.category === 'MF'))) return true;
          if ((posFilter === 'LFB' || posFilter === 'LSB') && (pos === 'LFB' || pos === 'LSB')) return true;
          if ((posFilter === 'RFB' || posFilter === 'RSB') && (pos === 'RFB' || pos === 'RSB')) return true;
          if ((posFilter === 'LW' || posFilter === 'LWG') && (pos === 'LW' || pos === 'LWG')) return true;
          if ((posFilter === 'RW' || posFilter === 'RWG') && (pos === 'RW' || pos === 'RWG')) return true;`;

appJsx = appJsx.replace(/if \(pos === posFilter\) return true;[\s\S]*?return false;/, flexPosLogic + '\n          return false;');

// Add プレースタイルLV Filter UI in src/app.jsx if not already present
if (!appJsx.includes('label className="text-xs font-bold text-slate-400 mb-1 block">プレースタイルLV</label>')) {
  const playStyleSelectBlock = `<label className="text-xs font-bold text-slate-400 mb-1 block">プレースタイル</label>
            <select
              value={playStyleFilter}
              onChange={e => setPlayStyleFilter(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00FF66]"
            >
              <option value="ALL">すべて</option>
              {PLAY_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>`;

  const newLvSelectBlock = `${playStyleSelectBlock}

          <div>
            <label className="text-xs font-bold text-slate-400 mb-1 block">プレースタイルLV</label>
            <select
              value={playStyleLevelFilter}
              onChange={e => setPlayStyleLevelFilter(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00FF66]"
            >
              <option value="ALL">すべて (LV.Ⅰ〜Ⅲ)</option>
              {PLAY_STYLE_LEVELS.map(lvl => <option key={lvl} value={lvl}>LV.{lvl}</option>)}
            </select>
          </div>`;

  appJsx = appJsx.replace(playStyleSelectBlock, newLvSelectBlock);
}

fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
console.log('Successfully updated src/app.jsx!');

// 2. Update src/data/mockData.js SAKATSUKU_DATA
let mockData = fs.readFileSync(mockDataPath, 'utf-8');
const sakatsukuDataDef = `window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ${JSON.stringify(newPositions)}, POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ${JSON.stringify(newPlayStyleLevels)}, PLAY_STYLES: ${JSON.stringify(newPlayStyles)} };`;

mockData = mockData.replace(/window\.SAKATSUKU_DATA = \{[\s\S]*?\};/, sakatsukuDataDef);
fs.writeFileSync(mockDataPath, mockData, 'utf-8');
console.log('Successfully updated src/data/mockData.js!');
