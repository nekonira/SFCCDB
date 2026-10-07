const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Analyzing onClick handlers and properties for crash risks...');

lines.forEach((line, i) => {
  if (line.includes('onClick')) {
    // Check if line or surrounding lines have potential unsafe calls
    const chunk = lines.slice(Math.max(0, i-2), Math.min(lines.length, i+15)).join('\n');
    if (chunk.includes('.map') || chunk.includes('.split') || chunk.includes('.length') || chunk.includes('.find') || chunk.includes('.filter')) {
      // Check for possible undefined access
      if (!chunk.includes('?') && !chunk.includes('|| []') && !chunk.includes('&&')) {
        console.log(`Line ${i+1}: Potential unsafe access in onClick chunk:\n${line.trim()}\n---`);
      }
    }
  }
});
