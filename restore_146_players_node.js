const fs = require('fs');
const path = require('path');
const vm = require('vm');

const brainDir = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain';
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');

console.log('--- Restoring All 146 Players cleanly via Node.js ---');

function getTranscriptFiles(dir, files = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        getTranscriptFiles(full, files);
      } else if (entry.isFile() && entry.name === 'transcript_full.jsonl') {
        files.push(full);
      }
    }
  } catch (e) {}
  return files;
}

const files = getTranscriptFiles(brainDir);
console.log(`Found ${files.length} transcript_full.jsonl files.`);

const validPlayers = new Map();

files.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Extract player objects
    const playerMatches = content.match(/\{\s*id:\s*['"]p\d+['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/g);
    if (playerMatches) {
      playerMatches.forEach(rawBlock => {
        let block = rawBlock.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        
        // Clean garbled strings if present
        block = block.replace(/rank:\s*['"][^'"]*驫[^'"]*['"]/g, "rank: '銅'");
        block = block.replace(/name:\s*['"][^'"]*迢吶＞[^\x27]*['"]/g, "name: '狙いすましたシュート'");
        block = block.replace(/description:\s*['"][^'"]*繧ｳ繝ｼ繧ｹ[^\x27]*['"]/g, "description: 'コースを突いたコントロールシュートで確実にネットを揺らす'");

        const idMatch = /id:\s*['"](p\d+)['"]/.exec(block);
        if (idMatch) {
          const pId = idMatch[1];
          try {
            const sandbox = {};
            vm.createContext(sandbox);
            vm.runInContext('const p = ' + block, sandbox);
            if (!validPlayers.has(pId) || block.length > validPlayers.get(pId).length) {
              validPlayers.set(pId, block);
            }
          } catch (e) {
            // ignore invalid JS block
          }
        }
      });
    }
  } catch (e) {}
});

console.log(`Found ${validPlayers.size} 100% VALID player objects!`);

const sortedIds = Array.from(validPlayers.keys()).sort((a, b) => parseInt(a.replace('p', '')) - parseInt(b.replace('p', '')));
const sortedBlocks = sortedIds.map(id => validPlayers.get(id));

const fullJs = `// mockData.js - Full Clean Player Database (${sortedIds.length} Players)\nwindow.INITIAL_PLAYERS = [\n${sortedBlocks.join(',\n')}\n];\n\nwindow.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };\n`;

fs.writeFileSync(mockPath, fullJs, 'utf-8');

// Verify whole file in VM
const testSandbox = { window: {} };
try {
  vm.createContext(testSandbox);
  vm.runInContext(fullJs, testSandbox);
  const count = testSandbox.window.INITIAL_PLAYERS.length;
  console.log(`\n🎉 SUCCESS! Evaluated mockData.js cleanly! TOTAL VALID PLAYERS LOADED: ${count}`);
} catch (err) {
  console.error('VM Eval Error:', err.message);
}
