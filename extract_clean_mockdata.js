const fs = require('fs');
const path = require('path');

const pyPath = path.join(__dirname, 'restore_all_players.py');
const pyContent = fs.readFileSync(pyPath, 'utf-8');

const startMarker = 'js_code = """';
const endMarker = '"""';

const startIdx = pyContent.indexOf(startMarker);
const endIdx = pyContent.lastIndexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
  const mockCode = pyContent.substring(startIdx + startMarker.length, endIdx).trim();
  const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('Extracted 100% clean mockData.js from restore_all_players.py! Size:', mockCode.length, 'bytes');
} else {
  console.error('Could not find markers in restore_all_players.py');
}
