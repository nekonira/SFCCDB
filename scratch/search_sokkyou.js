const fs = require('fs');
const path = require('path');

function searchAllFiles(dir, term) {
  try {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      try {
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          if (f !== 'node_modules' && f !== '.git') searchAllFiles(full, term);
        } else if (f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.ps1') || f.endsWith('.json')) {
          const content = fs.readFileSync(full, 'utf-8');
          if (content.includes(term)) {
            console.log(`Found in ${full}`);
            const lines = content.split('\n');
            lines.forEach((l, i) => {
              if (l.includes(term)) console.log(`  L${i+1}: ${l.substring(0, 150)}`);
            });
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('--- Searching for 即興 ---');
searchAllFiles('c:\\Users\\nekon\\SFCCdeta', '即興');
console.log('--- Searching for 起点 ---');
searchAllFiles('c:\\Users\\nekon\\SFCCdeta', '起点');
console.log('--- Searching for ドリブンパス ---');
searchAllFiles('c:\\Users\\nekon\\SFCCdeta', 'ドリブンパス');
