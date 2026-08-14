const fs = require('fs');
const path = require('path');
const vm = require('vm');

const brainDir = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain';
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');

console.log('--- Rebuilding All 146 Clean Players from Transcript Logs ---');

function getAllFiles(dirPath, arrayOfFiles) {
  try {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      try {
        if (fs.statSync(fullPath).isDirectory()) {
          arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
          if (file.endsWith('.jsonl')) {
            arrayOfFiles.push(fullPath);
          }
        }
      } catch (e) {}
    });
  } catch (e) {}
  return arrayOfFiles;
}

const logFiles = getAllFiles(brainDir);
console.log(`Found ${logFiles.length} transcript log files.`);

const playerBlocks = new Map();

const replacements = [
  ['繧ｫ繧ｦ繝ｳ繧ｿ繝ｼ', 'カウンター'],
  ['繝繝ｼ繝薙Φ繧ｰ', 'ムービング'],
  ['繝昴ぞ繝・す繝ｧ繝ｳ', 'ポゼッション'],
  ['繝ｪ繧｢繧ｯ繧ｷ繝ｧ繝ｳ', 'リアクション'],
  ['笘・', '☆3'],
  ['竇', 'Ⅰ'],
  ['竇｡', 'Ⅱ'],
  ['竇｢', 'Ⅲ'],
  ['竇｣', 'Ⅳ'],
  ['竇､', 'Ⅴ'],
  ['繧ｹ繝医Λ繧､繧ｫ繝ｼ', 'ストライカー'],
  ['繝ｩ繧､繝ｳ繝悶Ξ繝ｼ繧ｫ繝ｼ', 'ラインブレーカー'],
  ['繧ｵ繧､繝峨い繧ｿ繝・き繝ｼ', 'サイドアタッカー'],
  ['繧ｿ繝ｼ繧ｲ繝・ヨ繝槭Φ', 'ターゲットマン'],
  ['繝√Ε繝ｳ繧ｹ繝｡繝ｼ繧ｫ繝ｼ', 'チャンスメーカー'],
  ['繧｢繧ｿ繝・き繝ｼ', 'アタッカー']
];

logFiles.forEach(file => {
  try {
    const text = fs.readFileSync(file, 'utf-8');
    const matches = text.match(/\{\s*id:\s*['"]p\d+['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/g);
    if (matches) {
      matches.forEach(rawBlock => {
        let block = rawBlock.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        
        for (const [garbled, clean] of replacements) {
          block = block.split(garbled).join(clean);
        }

        const idMatch = /id:\s*['"](p\d+)['"]/.exec(block);
        if (idMatch) {
          const pId = idMatch[1];
          // Try VM eval
          try {
            const sandbox = {};
            vm.createContext(sandbox);
            vm.runInContext('const p = ' + block, sandbox);
            if (!playerBlocks.has(pId) || block.length > playerBlocks.get(pId).length) {
              playerBlocks.set(pId, block);
            }
          } catch (err) {
            // ignore malformed candidate
          }
        }
      });
    }
  } catch (e) {}
});

console.log(`Found ${playerBlocks.size} VALID player objects!`);

const sortedIds = Array.from(playerBlocks.keys()).sort((a, b) => parseInt(a.replace('p', '')) - parseInt(b.replace('p', '')));
const sortedBlocks = sortedIds.map(id => playerBlocks.get(id));

const fullJs = `// mockData.js - Full Clean Player Database (${sortedIds.length} Players)\nwindow.INITIAL_PLAYERS = [\n${sortedBlocks.join(',\n')}\n];\n\nwindow.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };\n`;

fs.writeFileSync(mockPath, fullJs, 'utf-8');

// Test entire mockData.js in VM
const testSandbox = { window: {} };
try {
  vm.createContext(testSandbox);
  vm.runInContext(fullJs, testSandbox);
  const count = testSandbox.window.INITIAL_PLAYERS.length;
  console.log(`\n🎉 SUCCESS! Evaluated mockData.js cleanly! TOTAL VALID PLAYERS LOADED: ${count}`);
} catch (err) {
  console.error('VM Eval Error on full mockData.js:', err.message);
}
