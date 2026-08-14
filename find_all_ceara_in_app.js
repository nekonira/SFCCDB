const fs = require('fs');
const path = require('path');

function checkFile(fileBasename) {
  const filePath = path.join(__dirname, 'src', fileBasename);
  const text = fs.readFileSync(filePath, 'utf-8');
  console.log(`=== CHECKING ${fileBasename} ===`);
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('p263') || line.includes('p115') || line.includes('2026_IMAGE') || line.includes('LEO_CEARA') || line.includes('2026TS')) {
      console.log(`Line ${i + 1}: ${line.trim()}`);
    }
  });
}

checkFile('app.js');
checkFile('app.jsx');
