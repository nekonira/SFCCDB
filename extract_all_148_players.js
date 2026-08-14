const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain';
const repoDir = 'c:\\Users\\nekon\\SFCCdeta';

console.log('--- Deep Scanning Brain Logs for Full 148 Player Database ---');

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
          if (file.endsWith('.jsonl') || file.endsWith('.js') || file.endsWith('.ps1') || file.endsWith('.html') || file.endsWith('.py')) {
            arrayOfFiles.push(fullPath);
          }
        }
      } catch (e) {}
    });
  } catch (e) {}
  return arrayOfFiles;
}

const allFiles = getAllFiles(brainDir).concat(getAllFiles(repoDir));
console.log(`Scanned ${allFiles.length} total files.`);

const playerMap = new Map();

// Regex pattern to extract player objects
const playerRegex = /\{\s*id:\s*['"](p\d+)['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/g;

allFiles.forEach(filePath => {
  try {
    const text = fs.readFileSync(filePath, 'utf-8');
    let match;
    while ((match = playerRegex.exec(text)) !== null) {
      const block = match[0];
      const idMatch = /id:\s*['"](p\d+)['"]/.exec(block);
      if (idMatch) {
        const pId = idMatch[1];
        // Clean unescaped slashes/newlines
        let cleanBlock = block.replace(/\\n/g, '\n').replace(/\\"/g, '"');
        
        // If we haven't seen this player or this block is cleaner/longer, store it
        if (!playerMap.has(pId) || cleanBlock.length > playerMap.get(pId).length) {
          playerMap.set(pId, cleanBlock);
        }
      }
    }
  } catch (err) {
    // ignore read errors
  }
});

console.log(`FOUND ${playerMap.size} UNIQUE PLAYERS IN BRAIN HISTORY!`);

// Sort players by ID number
const sortedIds = Array.from(playerMap.keys()).sort((a, b) => {
  return parseInt(a.replace('p', '')) - parseInt(b.replace('p', ''));
});

console.log('Sorted Player IDs:', sortedIds.join(', '));

const playerBlocksArr = sortedIds.map(id => playerMap.get(id));

const fullMockDataJs = `// mockData.js - Full Player Database (${sortedIds.length} Players)
window.INITIAL_PLAYERS = [
${playerBlocksArr.join(',\n')}
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const mockDataPath = path.join(repoDir, 'src', 'data', 'mockData.js');
fs.writeFileSync(mockDataPath, fullMockDataJs, 'utf-8');
console.log(`\nSUCCESSFULLY WRITTEN ${sortedIds.length} PLAYERS TO ${mockDataPath}! Size: ${fullMockDataJs.length} bytes.`);
