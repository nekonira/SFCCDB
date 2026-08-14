const fs = require('fs');
const path = require('path');
const vm = require('vm');

const brainDir = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain';
function getLogs(dir, files = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        getLogs(full, files);
      } else if (entry.isFile() && entry.name === 'transcript_full.jsonl') {
        files.push(full);
      }
    }
  } catch (e) {}
  return files;
}

const logFiles = getLogs(brainDir);
console.log(`Found ${logFiles.length} log files.`);

const pMap = new Map();

logFiles.forEach(file => {
  const text = fs.readFileSync(file, 'utf-8')
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');

  // Match INITIAL_PLAYERS array assignments in logs
  const matches = text.match(/window\.INITIAL_PLAYERS\s*=\s*(\[\s*\{[\s\S]*?\}\s*\]);?/g);
  if (matches) {
    matches.forEach(m => {
      const sandbox = { window: {} };
      try {
        vm.createContext(sandbox);
        vm.runInContext(m, sandbox);
        const list = sandbox.window.INITIAL_PLAYERS || [];
        list.forEach(p => {
          if (p && p.id) {
            if (!pMap.has(p.id) || JSON.stringify(p).length > JSON.stringify(pMap.get(p.id)).length) {
              pMap.set(p.id, p);
            }
          }
        });
      } catch (e) {}
    });
  }
});

console.log(`Total unique players found from INITIAL_PLAYERS arrays in logs: ${pMap.size}`);
const sorted = Array.from(pMap.keys()).sort((a,b) => parseInt(a.replace('p',''),10) - parseInt(b.replace('p',''),10));
console.log('IDs found:', sorted.join(', '));
