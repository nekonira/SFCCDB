const fs = require('fs');
const code = fs.readFileSync('scratch/TrainingSimulatorTab_extracted.js', 'utf8');

console.log('--- TrainingSimulatorTab Signature & Props ---');
console.log(code.slice(0, 300));

console.log('\n--- Where officialCards is declared / obtained ---');
let cardPos = 0;
while ((cardPos = code.indexOf('officialCards', cardPos)) !== -1) {
  console.log('At pos', cardPos, ':', code.slice(Math.max(0, cardPos - 50), Math.min(code.length, cardPos + 100)));
  cardPos += 'officialCards'.length;
}

console.log('\n--- Where handleDirectAutoSelect is declared ---');
let fnPos = code.indexOf('handleDirectAutoSelect');
if (fnPos !== -1) {
  console.log(code.slice(Math.max(0, fnPos - 50), Math.min(code.length, fnPos + 500)));
}
