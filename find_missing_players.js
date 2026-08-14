const fs = require('fs');
const path = require('path');

const rootDirs = [
  'C:\\Users\\nekon\\.gemini',
  'c:\\Users\\nekon\\SFCCdeta'
];

console.log('--- Deep Regex Search for All Player IDs p01 to p148 ---');

const foundPlayers = new Map();

function searchDir(dirPath) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        searchDir(fullPath);
      } else if (entry.isFile()) {
        try {
          const stats = fs.statSync(fullPath);
          if (stats.size > 100 && stats.size < 50000000) { // scan files up to 50MB
            const text = fs.readFileSync(fullPath, 'utf-8');
            // Regex to find player object blocks
            const matches = text.match(/\{\s*id:\s*['"]p\d+['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/g);
            if (matches) {
              matches.forEach(block => {
                const idMatch = /id:\s*['"](p\d+)['"]/.exec(block);
                if (idMatch) {
                  const pId = idMatch[1];
                  const cleanBlock = block.replace(/\\n/g, '\n').replace(/\\"/g, '"');
                  if (!foundPlayers.has(pId) || cleanBlock.length > foundPlayers.get(pId).length) {
                    foundPlayers.set(pId, cleanBlock);
                  }
                }
              });
            }
          }
        } catch (e) {}
      }
    }
  } catch (e) {}
}

rootDirs.forEach(dir => searchDir(dir));

console.log(`TOTAL UNIQUE PLAYERS FOUND ACROSS DISK: ${foundPlayers.size}`);
const sortedIds = Array.from(foundPlayers.keys()).sort((a, b) => parseInt(a.replace('p', '')) - parseInt(b.replace('p', '')));
console.log('Found IDs:', sortedIds.join(', '));

if (foundPlayers.size > 0) {
  const playerBlocksArr = sortedIds.map(id => foundPlayers.get(id));
  const fullMockDataJs = `// mockData.js - Full Player Database (${sortedIds.length} Players)\nwindow.INITIAL_PLAYERS = [\n${playerBlocksArr.join(',\n')}\n];\n\nwindow.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };\n`;
  const mockDataPath = path.join('c:\\Users\\nekon\\SFCCdeta', 'src', 'data', 'mockData.js');
  fs.writeFileSync(mockDataPath, fullMockDataJs, 'utf-8');
  console.log(`Updated ${mockDataPath} with ${sortedIds.length} players! Size: ${fullMockDataJs.length} bytes.`);
}
