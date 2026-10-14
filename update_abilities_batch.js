const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Updating Ability Descriptions Across Codebase ===');

const updates = [
  {
    name: '俊敏なマーカー',
    rank: '銀',
    newDesc: '発動条件：好調　/　パスカット・敏捷性UP'
  },
  {
    name: 'ムービングターゲット',
    rank: '銀',
    newDesc: '発動条件：好調　/　キープ力・走力UP'
  },
  {
    name: 'ゴール前の落ち着き',
    rank: '銅',
    newDesc: '発動条件：途中出場　/　決定力・ボールタッチUP'
  }
];

// Helper to replace in a given code string
function applyUpdates(content, filename) {
  let updatedContent = content;
  let totalReplaces = 0;

  updates.forEach(u => {
    // Regex matching { name: '...', rank: '...', description: '...' } in various formatting
    const regex1 = new RegExp(
      `(\\{\\s*name:\\s*['"]${u.name}['"]\\s*,\\s*rank:\\s*['"]${u.rank}['"]\\s*,\\s*description:\\s*['"])([^'"]*)(['"]\\s*\\})`,
      'g'
    );
    // Regex matching { rank: '...', name: '...', description: '...' }
    const regex2 = new RegExp(
      `(\\{\\s*rank:\\s*['"]${u.rank}['"]\\s*,\\s*name:\\s*['"]${u.name}['"]\\s*,\\s*description:\\s*['"])([^'"]*)(['"]\\s*\\})`,
      'g'
    );

    let matchCount = 0;
    updatedContent = updatedContent.replace(regex1, (m, p1, p2, p3) => {
      matchCount++;
      return p1 + u.newDesc + p3;
    });
    updatedContent = updatedContent.replace(regex2, (m, p1, p2, p3) => {
      matchCount++;
      return p1 + u.newDesc + p3;
    });

    if (matchCount > 0) {
      console.log(`  [${filename}] Updated ${matchCount} occurrence(s) for ${u.rank} ${u.name}`);
      totalReplaces += matchCount;
    }
  });

  return { updatedContent, totalReplaces };
}

// 1. Update mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');
const { updatedContent: newMockCode, totalReplaces: mockReplaces } = applyUpdates(mockCode, 'mockData.js');
fs.writeFileSync(mockPath, newMockCode, 'utf-8');
console.log(`✅ 1. Updated mockData.js (Total changes: ${mockReplaces})`);

// 2. Update add_*.js files
const rootFiles = fs.readdirSync(__dirname).filter(f => f.startsWith('add_') && f.endsWith('.js'));
let modifiedFilesCount = 0;

rootFiles.forEach(f => {
  const fPath = path.join(__dirname, f);
  const content = fs.readFileSync(fPath, 'utf-8');
  const { updatedContent, totalReplaces } = applyUpdates(content, f);
  if (totalReplaces > 0) {
    fs.writeFileSync(fPath, updatedContent, 'utf-8');
    modifiedFilesCount++;
  }
});
console.log(`✅ 2. Updated ${modifiedFilesCount} add_*.js script(s)`);

// 3. Update index.html cache buster
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const now = Date.now();
htmlContent = htmlContent.replace(/app\.js\?v=\d+/, `app.js?v=${now}`);
htmlContent = htmlContent.replace(/main\.js\?v=\d+/, `main.js?v=${now}`);
htmlContent = htmlContent.replace(/mockData\.js\?v=\d+/, `mockData.js?v=${now}`);
fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log(`✅ 3. Updated cache buster in index.html`);

// 4. Verification with Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(newMockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('--------------------------------------------------');
console.log('Verification Results:');
updates.forEach(u => {
  console.log(`Checking ${u.rank}「${u.name}」:`);
  let found = 0;
  players.forEach(p => {
    (p.abilities || []).forEach(a => {
      if (a.name === u.name && a.rank === u.rank) {
        found++;
        console.log(`  - ${p.id} ${p.name}: ${a.description}`);
      }
    });
  });
  console.log(`  Total verified: ${found}`);
});
console.log('--------------------------------------------------');
console.log('🎉 ALL UPDATES COMPLETED SUCCESSFULLY!');
