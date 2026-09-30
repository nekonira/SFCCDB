const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

try {
  new Function(mockCode);
  console.log('✅ Syntax is PERFECT using new Function()');
} catch (e) {
  console.error('❌ Syntax Error:', e.message);
  // Find line number
  const lines = mockCode.split('\n');
  for (let i = 0; i < lines.length; i++) {
    try {
      new Function(lines.slice(0, i + 1).join('\n'));
    } catch (err) {
      if (err instanceof SyntaxError && !err.message.includes('Unexpected end of input') && !err.message.includes('Unterminated')) {
        console.log(`Error near line ${i+1}: ${lines[i]}`);
      }
    }
  }
}
