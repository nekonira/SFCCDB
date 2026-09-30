const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const lines = code.split('\n');
lines.forEach((line, i) => {
  if (line.includes('最大数値編成') || line.includes('無難最適') || line.includes('AutoCardSelectModal') || line.includes('calculateBoostedPlayer')) {
    console.log(`L${i+1}:`, line.trim().substring(0, 120));
  }
});
