const fs = require('fs');
const path = require('path');

console.log('=== UPDATING LAMINE YAMAL PLAYSTYLE TO ワイドストライカーRW ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const addYamalPath = path.join(__dirname, 'add_yamal.js');

let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p373Idx = mockCode.indexOf("id: 'p373'");
if (p373Idx !== -1) {
  const styleIdx = mockCode.indexOf("playStyle: 'ワイドストライカー'", p373Idx);
  if (styleIdx !== -1 && styleIdx < p373Idx + 400) {
    mockCode = mockCode.substring(0, styleIdx) + "playStyle: 'ワイドストライカーRW'" + mockCode.substring(styleIdx + "playStyle: 'ワイドストライカー'".length);
  }
}

if (!mockCode.includes("'ワイドストライカーRW'")) {
  console.log("Adding ワイドストライカーRW to PLAY_STYLES array...");
  mockCode = mockCode.replace("'ワイドストライカー'", "'ワイドストライカー', 'ワイドストライカーRW'");
}

fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log("1. Updated src/data/mockData.js for Lamine Yamal playStyle: ワイドストライカーRW");

if (fs.existsSync(addYamalPath)) {
  let addYamalCode = fs.readFileSync(addYamalPath, 'utf-8');
  addYamalCode = addYamalCode.replace("playStyle: 'ワイドストライカー'", "playStyle: 'ワイドストライカーRW'");
  fs.writeFileSync(addYamalPath, addYamalCode, 'utf-8');
  console.log("2. Updated add_yamal.js");
}

console.log("=== LAMINE YAMAL PLAYSTYLE UPDATED SUCCESSFULLY! ===");
