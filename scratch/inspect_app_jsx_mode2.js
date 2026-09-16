const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('displayMode === 2') || line.includes('detailStatList.map') || line.includes('getDetailStatLimitInfo')) {
    console.log((idx + 1) + ': ' + line);
  }
});
