const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const buttonRegex = /<button[\s\S]*?>([\s\S]*?)<\/button>/g;
let match;
let count = 0;
const buttonLabels = [];

while ((match = buttonRegex.exec(jsxContent)) !== null) {
  count++;
  const label = match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  const lineNum = jsxContent.substring(0, match.index).split('\n').length;
  buttonLabels.push({ lineNum, label });
}

console.log(`Found ${count} buttons in app.jsx.`);

buttonLabels.forEach(b => {
  if (b.label.includes('線') || b.label.includes('変更') || b.label.includes('切替') || b.label.includes('種') || b.label.includes('凸') || b.label.includes('ボーナス') || b.label.includes('表示') || b.label.includes('タイプ') || b.label.includes('比較')) {
    console.log(`Line ${b.lineNum}: "${b.label}"`);
  }
});
