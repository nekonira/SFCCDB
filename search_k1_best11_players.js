const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const brainDir = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain';

const mockCode = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Inspecting (K1 BEST11 2025) Players in Current mockData.js ---');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];

const k1Players = players.filter(p => p.name.includes('BEST11') || p.name.includes('2025') || p.name.includes('K1') || (p.note && p.note.includes('BEST11')) || (p.rarity && p.rarity.includes('BEST11')));

console.log(`Found ${k1Players.length} BEST11 players in current mockData.js:`);
k1Players.forEach(p => {
  console.log(`ID: ${p.id}, Name: ${p.name}, Position: ${p.mainPosition}, Overall: ${p.overall}, Skill: ${p.skill?.name}, Avatar: ${p.avatarUrl}`);
});

console.log('\n--- Deep Search for BEST11 / K1 Players in Transcript Logs ---');

function getTranscriptFiles(dir, files = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        getTranscriptFiles(full, files);
      } else if (entry.isFile() && entry.name.endsWith('.jsonl')) {
        files.push(full);
      }
    }
  } catch (e) {}
  return files;
}

const logFiles = getTranscriptFiles(brainDir);
const foundBest11Blocks = [];

logFiles.forEach(file => {
  try {
    const text = fs.readFileSync(file, 'utf-8');
    if (text.includes('BEST11') || text.includes('K1')) {
      let cleanText = text.replace(/\\r\\n\d+:\s*/g, '\n').replace(/\\n\d+:\s*/g, '\n').replace(/\r?\n\d+:\s*/g, '\n').replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      const matches = cleanText.match(/\{\s*id:\s*['"]p\d+['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/g);
      if (matches) {
        matches.forEach(block => {
          if (block.includes('BEST11') || block.includes('K1')) {
            foundBest11Blocks.push({ file, block });
          }
        });
      }
    }
  } catch (e) {}
});

console.log(`Found ${foundBest11Blocks.length} BEST11 blocks in transcript logs.`);
foundBest11Blocks.slice(0, 15).forEach((b, idx) => {
  console.log(`\nBlock ${idx + 1} (${b.file}):`);
  console.log(b.block.substring(0, 300) + '...');
});
