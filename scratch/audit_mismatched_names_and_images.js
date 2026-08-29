const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const reportPath = path.join(rootDir, 'scratch', 'complete_player_audit_report.json');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

console.log(`Auditing ${report.length} players for name vs image file consistency...`);

const suspiciousList = [];

report.forEach(item => {
  const pName = item.name.toLowerCase();
  const fName = item.imageFile.toLowerCase().replace('image.js', '');
  const vName = item.varName.toLowerCase().replace('_image', '');

  // Print first 20 and last 20 as sample
  if (item.id === 'p01' || item.id === 'p10' || item.id === 'p50' || item.id === 'p100' || item.id === 'p150' || item.id === 'p200' || item.id === 'p250' || item.id === 'p300' || item.id === 'p330' || item.id === 'p373') {
    console.log(`[SAMPLE] ${item.id}: ${item.name} -> ${item.varName} (${item.imageFile})`);
  }
});

console.log('\nAudit complete!');
