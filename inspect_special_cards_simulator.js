const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const regex = /(スロット|特練|シミュレータ|ランク)/g;
const lines = code.split('\n');
lines.forEach((line, i) => {
  if (line.includes('スロット') || line.includes('特練カード') || line.includes('シミュレータ')) {
    console.log(`L${i+1}:`, line.trim().substring(0, 120));
  }
});
