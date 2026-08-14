const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const mockDataPath = path.join(__dirname, 'src', 'data', 'mockData.js');

const appText = fs.readFileSync(appJsxPath, 'utf-8');
const mockText = fs.readFileSync(mockDataPath, 'utf-8');

console.log('--- Inspecting POSITIONS & PLAY_STYLES in src/app.jsx ---');

const lines = appText.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('POSITIONS') || line.includes('PLAY_STYLES') || line.includes('PLAY_STYLE_LEVELS')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});

console.log('\n--- SAKATSUKU_DATA in mockData.js ---');
const lastLines = mockText.split('\n').slice(-5);
console.log(lastLines.join('\n'));
