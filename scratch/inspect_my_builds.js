const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating all Saved Builds / マイ編成 buttons & handlers ===');

lines.forEach((line, idx) => {
  if (line.includes('savedBuilds') || line.includes('SavedBuilds') || line.includes('マイ編成')) {
    console.log(`L${idx+1}: ${line}`);
  }
});
