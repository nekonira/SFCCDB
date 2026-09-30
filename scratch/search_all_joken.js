const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Checking all occurrences of 条件 or 自動編成 in app.jsx ===');
lines.forEach((line, idx) => {
  if (line.includes('条件指定') || line.includes('条件指定編成') || line.includes('自動編成') || line.includes('自動選択')) {
    console.log(`L${idx+1}: ${line}`);
  }
});
