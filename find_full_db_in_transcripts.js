const fs = require('fs');
const path = require('path');
const vm = require('vm');

const brainDir = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain';
console.log('--- Searching for transcript_full.jsonl with Full 148 Player Database ---');

function searchTranscripts(dir) {
  let bestDb = '';
  let maxCount = 0;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const res = searchTranscripts(fullPath);
      if (res.maxCount > maxCount) {
        maxCount = res.maxCount;
        bestDb = res.bestDb;
      }
    } else if (entry.isFile() && (entry.name === 'transcript_full.jsonl' || entry.name.endsWith('.ps1') || entry.name.endsWith('.py'))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const matches = content.match(/(window\.|const\s+)INITIAL_PLAYERS\s*=\s*\[[\s\S]*?\];/g);
        if (matches) {
          matches.forEach(rawBlock => {
            let cleanBlock = rawBlock.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            // Try evaluating in VM sandbox to test validity & count
            try {
              const sandbox = { window: {} };
              vm.createContext(sandbox);
              vm.runInContext(cleanBlock, sandbox);
              const players = sandbox.INITIAL_PLAYERS || sandbox.window.INITIAL_PLAYERS;
              if (players && players.length > maxCount) {
                maxCount = players.length;
                bestDb = cleanBlock;
                console.log(`Found valid DB with ${maxCount} players in ${entry.name} (${fullPath})`);
              }
            } catch (err) {
              // try regex player match
              const pCount = (cleanBlock.match(/id:\s*['"]p\d+['"]/g) || []).length;
              if (pCount > maxCount) {
                // inspect syntax
              }
            }
          });
        }
      } catch (e) {}
    }
  }
  return { maxCount, bestDb };
}

const result = searchTranscripts(brainDir);
console.log(`\nBEST DB FOUND HAS ${result.maxCount} PLAYERS!`);

if (result.maxCount >= 100) {
  const fullJs = `${result.bestDb}\n\nwindow.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS || INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };`;
  
  const mockPath = path.join('c:\\Users\\nekon\\SFCCdeta', 'src', 'data', 'mockData.js');
  fs.writeFileSync(mockPath, fullJs, 'utf-8');
  console.log(`SUCCESSFULLY RESTORED ${result.maxCount} PLAYER DATABASE TO ${mockPath}! Size: ${fullJs.length} bytes.`);
}
