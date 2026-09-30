const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

mockCode = mockCode.replace("  },\n  id: 'p106',", "  },\n  {\n    id: 'p106',");

fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('✅ Fixed missing opening brace for p106 in mockData.js');

// Verify syntax
try {
  new Function(mockCode);
  console.log('🎉 SYNTAX PERFECT!');
} catch (e) {
  console.error('❌ Syntax Error:', e.message);
}
