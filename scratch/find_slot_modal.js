const fs = require('fs');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

const lines = appJsx.split('\n');
lines.forEach((line, i) => {
  if (line.includes('SlotModal') || line.includes('slotModal') || line.includes('openSlot') || line.includes('handleSlotClick')) {
    console.log(`Line ${i + 1}: ${line.trim()}`);
  }
});
