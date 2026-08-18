const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\nekon\\SFCCdeta';
const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const regex = /<script\s+src=["']\.\/([^"']+)["']/g;
let match;
const missing = [];
const mismatchedCase = [];

while ((match = regex.exec(html)) !== null) {
  const relPath = match[1].split('?')[0];
  const fullPath = path.join(root, relPath);
  
  if (!fs.existsSync(fullPath)) {
    missing.push(relPath);
  } else {
    // Check exact casing on disk
    const dir = path.dirname(fullPath);
    const base = path.basename(fullPath);
    const filesOnDisk = fs.readdirSync(dir);
    if (!filesOnDisk.includes(base)) {
      const matchOnDisk = filesOnDisk.find(f => f.toLowerCase() === base.toLowerCase());
      mismatchedCase.push({ html: base, disk: matchOnDisk });
    }
  }
}

console.log('Missing scripts:', missing);
console.log('Case mismatches:', mismatchedCase);
