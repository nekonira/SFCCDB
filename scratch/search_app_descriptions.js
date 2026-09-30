const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('Searching for skill updates and description dictionaries in app.jsx...');

lines.forEach((line, idx) => {
  if (line.includes('驚異の弾道') || line.includes('反転攻勢') || line.includes('柔軟なキッカー') || line.includes('description') || line.includes('Description')) {
    if (line.includes('発動エリア') || line.includes('発動条件') || line.includes('UP')) {
      console.log(`L${idx+1}: ${line}`);
    }
  }
});
